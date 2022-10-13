import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      username: '',
      password: ''
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user.username = ''
      state.user.password = ''
      window.localStorage.removeItem('user')
    }
  }
})
