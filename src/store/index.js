import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username')),
      password: window.localStorage.getItem('password') == null ? '' : JSON.parse(window.localStorage.getItem('password'))
    }
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
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('password')
    }
  }
})
