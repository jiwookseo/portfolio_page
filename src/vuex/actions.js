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
          alert("회원가입 완료")
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
          alert("에러 : " + error)
        }
      )
  },
  signUserIn({
    commit
  }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          alert("로그인 완료")
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
          alert("에러 : " + error)
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
          alert("로그인 완료")
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
      .then((user) => {
        commit('setUser', null)
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
