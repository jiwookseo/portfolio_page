import Vue from 'vue'
import './plugins/vuetify'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

import "expose-loader?$!expose-loader?jQuery!jquery";
window.$ = window.jQuery = require("jquery");

import AOS from 'aos';
import 'aos/dist/aos.css';

Vue.config.productionTip = false;

Vue.use(VueSimplemde);

let app = ''

const firebaseConfig = {
  apiKey: "AIzaSyDAdqPGqhuW9RiiIwslWF3eC6FueHnX21c",
  authDomain: "vue-firebase-tutorial-da26f.firebaseapp.com",
  databaseURL: "https://vue-firebase-tutorial-da26f.firebaseio.com",
  projectId: "vue-firebase-tutorial-da26f",
  storageBucket: "",
  messagingSenderId: "173286603007",
  appId: "1:173286603007:web:2258c081f9102650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      created() {
        AOS.init({
          once: false,
        });
      },
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
