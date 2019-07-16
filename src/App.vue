<template>
  <v-app id="app">
    <v-content class="content">
      <router-view />
      <Footer />
      <TranslateBtn />
      <ChatBtn />
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import ChatBtn from "./components/ChatBtn";
import TranslateBtn from "./components/TranslateBtn";

export default {
  name: "App",
  components: {
    Footer,
    ChatBtn,
    TranslateBtn
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
@import "./css/reset.css";
@import "./css/style.scss";
@import "./css/mixin.scss";

.content {
  position: relative;
}
</style>

<style lang="scss">
@import "./css/style.scss";
body {
  overflow-y: auto;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  display: none;
}
div,
span {
  font-family: $font-content;
}
</style>
