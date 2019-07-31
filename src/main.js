import '@mdi/font/css/materialdesignicons.css'
import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import App from "./App.vue";
import router from "./router";
import store from "@/vuex/store";

import "expose-loader?$!expose-loader?jQuery!jquery";
window.$ = window.jQuery = require("jquery");

import AOS from "aos";
import "aos/dist/aos.css";
import VuePageTransition from 'vue-page-transition';
import * as firebase from "firebase";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueSimplemde);
Vue.use(VueSweetalert2);
Vue.use(VuePageTransition);

new Vue({
  vuetify,
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        // console.log(user.email);
      }
    });
    AOS.init({
      once: true
    });
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default {

  getNewToken() {
    console.log("토큰시작");

    var config = {
      apiKey: "AIzaSyCPsjIgD6dIjp1o9Xd56bsBW64VMwdX6x8",
      authDomain: "ssafy-teamsix.firebaseapp.com",
      databaseURL: "https://ssafy-teamsix.firebaseio.com",
      projectId: "ssafy-teamsix",
      storageBucket: "ssafy-teamsix.appspot.com",
      messagingSenderId: "207653910315",
      appId: "1:207653910315:web:33636c136bf2abae"
    }; // 4. Get Firebase Configuration

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(
      "BBBpw-_z752QFHrMQElXJSrxpEB8_vKtiKUgD6sQvuuIbLSS5odGEeh--BzMYSqxYw3ikgePoUgQKPFJK1ed9D0"
    ); // 1. Generate a new key pair

    // Request Permission of Notifications
    console.log("토큰중간과정");
    messaging
      .requestPermission()
      .then(() => {
        // Get Token
        messaging.getToken().then(token => {
          console.log("성공");
          console.log("7.31.2");
          console.log(token);
          return token;
        });
      })
      .catch(err => {
        console.log("실패");
        return null;
      });
  }

}