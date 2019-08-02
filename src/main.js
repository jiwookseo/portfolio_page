import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import App from "./App.vue";
import router from "./router";
import store from "@/vuex/store";
import "./firebase/firebase";
import "expose-loader?$!expose-loader?jQuery!jquery";
window.$ = window.jQuery = require("jquery");

import AOS from "aos";
import "aos/dist/aos.css";
import VuePageTransition from "vue-page-transition";
import firebaseAuth from "./firebase/firebaseAuth";
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
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
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
