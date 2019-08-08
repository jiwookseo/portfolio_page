import Vue from "vue";
import firebaseAuth from "../firebase/firebaseAuth";
import firestore from "../firebase/firestore";
import firebaseMessage from "../firebase/firebaseMessage";

export default {
  signUserUp({ commit }, payload) {
    // 로컬 회원가입
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit("setLoading", false);
        Vue.swal("Welcome!", "Thanks for joining us :)", "success");
        user = firebaseAuth.currentUser;
        if (user) {
          user
            .updateProfile({
              displayName: payload.name
            })
            .then(async () => {
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: null,
                authority: "3",
                token: await firebaseMessage.getNewToken()
              };
              firestore.postUser(
                newUser.email,
                newUser.authority,
                newUser.token
              );
              commit("setUser", newUser);
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
  signUserIn({ commit }, payload) {
    // 로컬 로그인
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(async credential => {
        commit("setLoading", false);
        commit("loginSuccess", true);
        const user = credential.user;
        Vue.swal(`Welcome ${user.displayName}!`, "", "success");
        const authority = await firestore.getUserAuthority(user.email); // firestore User doc 에서 데이터를 받아옴
        const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
        console.log(token);
        firestore.updateUserByEmail(user.email, {
          token
        });
        commit("setUser", {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          authority,
          token
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
      .signInWithPopup(new firebaseAuth.FacebookAuthProvider())
      .then(async credential => {
        commit("setLoading", false);
        commit("loginSuccess", true);
        const user = credential.user;
        Vue.swal(`Welcome ${user.displayName}!`, "", "success");
        const authority = await firestore.getUserAuthority(user.email); // firestore User doc 에서 데이터를 받아옴
        const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
        const facebookUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          token
        };
        if (authority) {
          facebookUser.photoURL = user.photoURL;
          facebookUser.authority = authority;
          firestore.updateUserByEmail(facebookUser.email, {
            token
          });
        } else {
          // if it's a new User
          facebookUser.photoURL = null; // 페이스북 프로필 사진 초기화
          user.updateProfile({
            photoURL: null
          });
          facebookUser.authority = "3"; // 방문자 등급 부여
          firestore.postUser(facebookUser.email, 3, token); // firestore User doc 추가 / firebaseAuth User 과 별개
        }
        commit("setUser", facebookUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        Vue.swal("Error", "" + error, "error");
      });
  },
  async autoSignIn({ commit }, payload) {
    const authority = await firestore.getUserAuthority(payload.email); // firestore User doc 에서 데이터를 받아옴
    const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
    firestore.updateUserByEmail(payload.email, {
      token
    });
    commit("setUser", {
      id: payload.uid,
      name: payload.displayName,
      email: payload.email,
      photoURL: payload.photoURL,
      authority,
      token
    });
  },
  logout({ commit }) {
    firebaseAuth
      .signOut()
      .then(() => {
        commit("setUser", null); // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
        commit("loginSuccess", false);
      })
      .catch(error => console.error(`SignOut Error: ${error}`));
  },
  setUserPhoto({ commit }, photoURL) {
    const user = firebaseAuth.currentUser;
    if (user) {
      user.updateProfile({
        photoURL
      });
      commit("setUserPhoto", photoURL);
    }
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
  },
  setSpinner({ commit }, payload) {
    payload.message = payload.message || "";
    commit("setSpinner", payload);
  },
  setAskSnackbar({ commit }, payload) {
    payload.message = payload.message || "";
    payload.button = payload.button || "";
    payload.type = payload.type || "";
    payload.confirm = payload.confirm || "";
    commit("setAskSnackbar", payload);
  },
  setAlertSnackbar({ commit }, payload) {
    payload.message = payload.message || "";
    commit("setAlertSnackbar", payload);
  }
};
