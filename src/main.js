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
import * as firebase from "firebase";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./registerServiceWorker";

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
messaging
  .requestPermission()
  .then(() => {
    console.log("Notification permission granted.");

    // Get Token
    messaging.getToken().then(token => {
      console.log(token);
    });
  })
  .catch(err => {
    console.log("Unable to get permission to notify.", err);
  });

Vue.config.productionTip = false;

Vue.use(VueSimplemde);
Vue.use(VueSweetalert2);

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
