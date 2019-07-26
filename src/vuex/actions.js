import Vue from "vue";
import firebase from "firebase";
import { firebaseAuth } from "@/firebase/firebaseAuth";
import firestore from "../firebase/firestore";

export default {
  signUserUp(
    {
      // 로컬 회원가입
      commit
    },
    payload
  ) {
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false);
        Vue.swal("Welcome!", "You have signed up successfully", "success");

        user = firebaseAuth.currentUser;
        if (user) {
          user
            .updateProfile({
              displayName: payload.name
            })
            .then(() => {
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: null,
                authority: "3"
              };
              commit("setUser", newUser);
              firestore.postUser(newUser.email, newUser.authority);
            });
        }
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        // console.log(error);
        Vue.swal("Error", "" + error, "error");
      });
  },
  signUserIn(
    {
      // 로컬 로그인
      commit
    },
    payload
  ) {
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false);
        commit("loginSuccess", true);
        Vue.swal("Welcome!", "Login successful", "success");
        user = firebaseAuth.currentUser;
        const authority = firestore.getUserAuthority(user.email);
        commit("setUser", {
          ...user,
          authority
        });
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        // console.log(error);
        Vue.swal("Error", "" + error, "error");
      });
  },
  signUserInFacebook({ commit }) {
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async result => {
        commit("setLoading", false);
        Vue.swal("Welcome!", "Login successful", "success");
        const existingAuthority = await firestore.getUserAuthority(
          result.user.email
        );
        const facebookUser = {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          authority: existingAuthority
        };
        if (existingAuthority === null) {
          // if it's a new User
          facebookUser.authority = "3";
          firestore.postUser(facebookUser.email, facebookUser.authority);
        }
        commit("setUser", facebookUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        Vue.swal("Error", "" + error, "error");
      });
  },
  autoSignIn({ commit }, payload) {
    firestore.getUserAuthority(payload.email).then(authority =>
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
        authority
      })
    );
  },
  logout({ commit }) {
    firebaseAuth
      .signOut()
      .then(() => {
        commit("setUser", null); // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
        commit("loginSuccess", false);
      })
      .catch(error => console.error(`SingOut Error: ${error}`));
  },

  clearError({ commit }) {
    commit("clearError");
  },
  setError({ commit }, payload) {
    commit("setError", payload);
  },
  getArticles({ commit }, type) {
    firestore.getArticles(type).then(res => {
      commit(type === "portfolios" ? "getPortfolios" : "getPosts", res);
    });
  },
  getUserAll({ commit }) {
    firestore.getUserAll().then(res => {
      commit("getUserAll", res);
    });
  }
  /*
  getUserInfo({commit}) {
    firestore.getUser().then(res => {
      commit('getUserInfo', res)
    })
  },
  */
};
