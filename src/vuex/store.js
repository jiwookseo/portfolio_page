import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
//import { firebaseAuth } from '@/firebase/firebaseAuth'

Vue.use(Vuex)

/*
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    this.$store.dispatch('autoSignIn', user)
    console.log("userName : " + user.email)
  } else {
    state.user = null
  }
})
*/

const state = {
  user: null,
  loading: false,
  error: null
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
    }
  }
})
