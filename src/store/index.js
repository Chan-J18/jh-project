import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username')),
      password: window.localStorage.getItem('password') == null ? '' : JSON.parse(window.localStorage.getItem('password')),
      role: ''
    },
    Menus: []
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('username', JSON.stringify(user.username))
      window.localStorage.setItem('password', JSON.stringify(user.password))
    },
    logout (state) {
      state.user.username = ''
      state.user.password = ''
      state.Menus = []
      state.role = ''
      location.reload() // 退出时清空路由,防止duplicate define 路由
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('password')
    },
    initAdminMenu (state, menus) {
      state.Menus = menus
    },
    role (state, role) {
      state.user.role = role
    }
  }
})
