import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Recent from '../components/Recent/Recent'
import Recommend from '../components/Recommend/Recommend'
import Topic from '../components/Topic/Topic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/recent',
      component: Home,
      children: [
        {
          path: '/recent',
          name: 'Recent',
          component: Recent
        },
        {
          path: '/recommend',
          name: 'Recommend',
          component: Recommend
        },
        {
          path: '/topic/:type',
          name: 'Topic',
          component: Topic
        }
      ]
    }
  ]
})
