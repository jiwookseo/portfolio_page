<template>
  <v-app id="app">
    <v-content class="content">
      <router-view />
      <TranslateBtn />
      <ChatBtn />
      <router-link to="/admin">
        <div id="toAdmin" title="Admin Page">
          <i class="material-icons">how_to_reg</i>
        </div>
      </router-link>
    </v-content>
  </v-app>
</template>

<script>
import ChatBtn from "./components/ChatBtn";
import TranslateBtn from "./components/TranslateBtn";

export default {
  name: "App",
  components: {
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

#toAdmin {
  width: 50px;
  height: 50px;
  position: fixed;
  border-radius: 50%;
  color: $blue-accent;
  border: 2px solid $blue-accent;
  bottom: 20px;
  left: 20px;
  opacity: 0.1;
  z-index: 15;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  i {
    @include centerItem;
  }
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
#line-chart{
  height: 400px !important;
}
</style>
