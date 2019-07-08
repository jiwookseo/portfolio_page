import Vue from 'vue'
import './plugins/vuetify'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import App from './App.vue'
import router from './router'
import store from './store'

import "expose-loader?$!expose-loader?jQuery!jquery";
window.$ = window.jQuery = require("jquery");

import AOS from 'aos';
import 'aos/dist/aos.css';

Vue.config.productionTip = false;

Vue.use(VueSimplemde);

new Vue({
  created() {
    AOS.init({
      once: false,
    });
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
