import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  admin: 'admin@admin.com',
  user: null,
  loading: false,
  error: null,
  loginSuccess: false
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    loginSuccess (state, payload) {
      state.loginSuccess = payload
    }
  }
})
