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
  width: 7px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 50px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
::-webkit-scrollbar-thumb:vertical {
  -webkit-border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0);
  min-height: 10px;
  &:active {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50px;
    -webkit-border-radius: 50px;
  }
}
div,
span {
  font-family: $font-content;
}
</style>
