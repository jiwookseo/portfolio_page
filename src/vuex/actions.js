import Vue from 'vue';
import firebase from "firebase";
import {
  firebaseAuth
} from '@/firebase/firebaseAuth'

export default {
  signUserUp({
    commit
  }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          Vue.swal("Welcome!", "You have signed up successfully", "success")
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          Vue.swal("Error", ""+error, "error")
        }
      )
  },
  signUserIn({ // 로컬 로그인
    commit
  }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          commit('loginSuccess', true)
          Vue.swal("Welcome!", "Login successful", "success")
          console.log(payload.email)
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          Vue.swal("Error", ""+error, "error")
        }
      )
  },
  signUserInFacebook({
    commit
  }) {
    commit('setLoading', true)
    commit('clearError')
    firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        user => {
          commit('setLoading', false)
          Vue.swal("Welcome!", "Login successful", "success")
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          Vue.swal("Error", ""+error, "error")
        }
      )
  },
  autoSignIn({
    commit
  }, payload) {
    commit('setUser', {
      id: payload.uid,
      name: payload.displayName,
      email: payload.email,
      photoUrl: payload.photoURL
    })
  },
  logout({commit}) {
    firebaseAuth
      .signOut()
      .then(() => {
        commit('setUser', null)
        commit('loginSuccess', false)
      })
      .catch((error) => console.error(`SingOut Error: ${error}`))
  },
  clearError({
    commit
  }) {
    commit('clearError')
  },
  setError({
    commit
  }, payload) {
    commit('setError', payload)
  }
}
