import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import { firebaseAuth } from '@/firebase/firebaseAuth'

Vue.use(Vuex)

firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    state.user = user
    console.log("user : " + user)
  } else {
    state.user = null
  }
})

const state = {
  user: null
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations: {

  }
})
