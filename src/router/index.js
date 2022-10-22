import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Recommend from '../components/Recommend/Recommend'
import Topic from '../components/Topic/Topic'
import Manage from '../components/Manage/Manage'
import RecentNews from '../components/Recent/RecentNews'
import HotNews from '../components/Recent/HotNews'
import HeaderNews from '../components/Recent/HeaderNews'
import Publish from '../components/Publish'
import ArticleDetail from '../components/common/ArticleDetail'
import Detail from '../components/admin/content/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/article/detail',
          name: 'Detail',
          component: Detail
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/recent',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: [
        {
          path: '/recent',
          name: 'Recent',
          meta: {
            requireAuth: true
          },
          components: {
            header: HeaderNews,
            main: RecentNews,
            right: HotNews
          }
        },
        {
          path: '/recommend',
          name: 'Recommend',
          meta: {
            requireAuth: true
          },
          component: Recommend
        },
        {
          path: '/topic/:type',
          name: 'Topic',
          meta: {
            requireAuth: true
          },
          component: Topic
        },
        {
          path: '/manage/:type',
          name: 'Manage',
          meta: {
            requireAuth: true
          },
          component: Manage
        },
        {
          path: '/publish',
          name: 'Publish',
          component: Publish
        },
        {
          path: '/article',
          name: 'Article',
          component: ArticleDetail
        }
      ]
    }
  ]
})
