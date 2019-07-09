<template>
  <v-app id="app">
    <v-content>
      <v-btn @click="translate">translate</v-btn>
      <router-view />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import axios from "axios";

const translateURL =
  "https://us-central1-test-68bfc.cloudfunctions.net/translate?query=";

export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      //
    };
  },
  methods: {
    translate: () => {
      document.querySelectorAll(".translateText").forEach(dom => {
        axios
          .get(translateURL + dom.innerText)
          .then(
            res => (dom.innerText = res.data.message.result.translatedText)
          );
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./css/reset.css";
@import "./css/style.css";
</style>

<style lang="scss">
body {
  overflow-y: auto;
  overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 7px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 50px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
body::-webkit-scrollbar-thumb:vertical {
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
</style>

