import Vue from "vue";
import router from "@/router";
import firebase from "firebase/app";
import firebaseAuth from "@/firebase/firebaseAuth";
import firestore from "@/firebase/firestore";
import firebaseMessage from "@/firebase/firebaseMessage";

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("public_profile");
provider.setCustomParameters({
  display: "popup"
});

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
                token: await firebaseMessage.getNewToken(),
                deleted: "0"
              };
              firestore.postUser(
                newUser.email,
                newUser.authority,
                newUser.token,
                newUser.deleted
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
    firestore.getUserAll().then(userAll =>
      userAll.forEach(user => {
        if (user.authority == "1") {
          firebaseMessage.pushMessage(
            user.token,
            "운영자님",
            "새로운 회원이 추가되었습니다."
          );
        }
      })
    );
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
        const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
        const data = await firestore.getUserData(user.email); // firestore User doc 에서 데이터를 받아옴
        const authority = data.authority; // 유저 권한
        const deleted = data.deleted; // 활동정지된 유저
        if (deleted === "1") {
          Vue.swal(
            "Error",
            "현재 활동정지된 회원입니다. 관리자에게 문의하세요",
            "error"
          );
          firebaseAuth
            .signOut()
            .then(() => {
              commit("setUser", null); // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
              commit("loginSuccess", false);
            })
            .catch(error => console.error(`SignOut Error: ${error}`));
        } else {
          Vue.swal(`Welcome ${user.displayName}!`, "", "success");
          //console.log(token);
          firestore.updateUserByEmail(user.email, {
            token
          });
          firestore.updateUserByEmail(user.email, {
            deleted
          });
          commit("setUser", {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            authority,
            token,
            deleted
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
  signUserInFacebook({ commit }) {
    commit("setLoading", true);
    commit("clearError");
    firebaseAuth
      .signInWithPopup(provider)
      .then(async credential => {
        commit("setLoading", false);
        commit("loginSuccess", true);
        const user = credential.user;
        const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
        const data = await firestore.getUserData(user.email); // firestore User doc 에서 데이터를 받아옴
        const authority = data.authority; // 유저 권한

        if (authority != null) {
          const deleted = data.deleted; // 활동정지된 유저

          if (deleted === "1") {
            Vue.swal(
              "Error",
              "현재 활동정지된 회원입니다. 관리자에게 문의하세요",
              "error"
            );
            firebaseAuth
              .signOut()
              .then(() => {
                commit("setUser", null); // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
                commit("loginSuccess", false);
              })
              .catch(error => console.error(`SignOut Error: ${error}`));
          } else {
            Vue.swal(`Welcome ${user.displayName}!`, "", "success");
            const facebookUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              token,
              deleted
            };
            facebookUser.authority = authority;
            firestore.updateUserByEmail(facebookUser.email, {
              token
            });
            firestore.updateUserByEmail(facebookUser.email, {
              deleted
            });
            commit("setUser", facebookUser);
          }
        } else {
          Vue.swal(`Welcome ${user.displayName}!`, "", "success");
          const facebookUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            deleted: "0"
          };
          facebookUser.token = null;
          facebookUser.authority = "3";
          user.updateProfile({
            photoURL: facebookUser.photoURL
          });
          commit("setUser", facebookUser);
          firestore.postUser(
            facebookUser.email,
            facebookUser.authority,
            facebookUser.token,
            facebookUser.deleted
          );
        }
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        Vue.swal("Error", error, "error");
      });
  },
  async autoSignIn({ commit }, payload) {
    const token = await firebaseMessage.getNewToken(); // firebaseMessage 에서 토큰을 받아옴
    const data = await firestore.getUserData(payload.email); // firestore User doc 에서 데이터를 받아옴
    const authority = data.authority; // 유저 권한
    const deleted = data.deleted; // 활동정지된 유저
    firestore.updateUserByEmail(payload.email, {
      token
    });
    firestore.updateUserByEmail(payload.email, {
      deleted
    });
    commit("setUser", {
      id: payload.uid,
      name: payload.displayName,
      email: payload.email,
      photoURL: payload.photoURL,
      authority,
      token,
      deleted
    });
  },
  logout({ commit }) {
    firebaseAuth
      .signOut()
      .then(() => {
        commit("setUser", null); // null 값으로 user의 정보를 만들 때 생기는 오류 체크하기
        commit("loginSuccess", false);
        router.replace("/");
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
