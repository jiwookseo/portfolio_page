<template></template>

// https://github.com/cmp-cc/vue-cookies --vue cookies 관련 git
  //main.js에 import하여 기능 사용
  //https://www.itread01.com/content/1545382649.html --vue cookie 설명
  //https://github.com/alfhen/vue-cookie --


<script>
export default {};
</script>

<style>
</style>

<script>
import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
var Vue = require("vue");
Vue.use(require("vue-cookies"));

VueCookies.config("30d");

VueCookies.set("theme", "default");
VueCookies.set("hover-time", "1s");

$cookies.set("token", this.token);
this.$cookie.get("token");

export default {};
</script>
