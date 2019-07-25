import Vue from 'vue';
import firebase from "firebase";
import {
  firebaseAuth
} from '@/firebase/firebaseAuth';
import firestore from "../firebase/firestore";

export default {
  signUserUp({ // 로컬 회원가입
    commit
  }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          Vue.swal("Welcome!", "You have signed up successfully", "success")

          user = firebaseAuth.currentUser;

          if(user){
            user.updateProfile({
               displayName: payload.name,
            }).then(()=>{
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                authority: '3'
              }
              commit('setUser', newUser)

              let userEmail = newUser.email
              let userAuthority = newUser.authority
              firestore.postUser(userEmail, userAuthority).then(() => {
                console.log("success postUser")
              });
            })
          }
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

          user = firebaseAuth.currentUser;
          commit('setUser', user)
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
            photoUrl: user.photoURL,
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
        commit('setUser', null) // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
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
  },
  getPosts({commit}) {
    firestore.getPosts().then(res => {
      commit('getPosts', res)
    })
  },
  getPortfolios({commit}) {
    firestore.getPortfolios().then(res => {
      commit('getPortfolios', res)
    })
  },
  getUserAll({commit}) {
    firestore.getUserAll().then(res => {
      commit('getUserAll', res)
    })
  },
  /*
  getUserInfo({commit}) {
    firestore.getUser().then(res => {
      commit('getUserInfo', res)
    })
  },
  */
}
