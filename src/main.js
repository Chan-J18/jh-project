// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8443'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
  if (store.state.user.username && to.path.startsWith('/admin')) {
    axios.post('/authentication', {
      username: store.state.user.username,
      password: store.state.user.password
    }).then(resp => {
      initAdminMenu(router, store)
    })
  }
  // 页面访问拦截、账号认证拦截的实现
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      axios.post('/authentication', {
        username: store.state.user.username,
        password: store.state.user.password
      }).then(resp => {
        if (resp.data.code === 200) next()
        else if (resp.data.code === 400) {
          next({
            path: '/',
            query: {
              redirect: to.fullPath,
              message: resp.data.message
            }
          })
        }
      })
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
          message: '请先进行登录！'
        }
      })
    }
  } else {
    next()
  }
})

const initAdminMenu = (router, store) => {
  if (store.state.Menus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
