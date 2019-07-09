<template>
  <v-app id="app">
    <v-content class="content">
      <router-view />
      <Footer />
      <div class="tr-box" v-if="askToTranslate">
        Would you like to translate this page?
        <div class="btn-box">
          <span class="yes" @click="translate">Translate</span>
          <span class="no" @click="askToTranslate = false">No</span>
        </div>
      </div>
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
      askToTranslate: true
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

.content {
  position: relative;
}
.tr-box {
  position: fixed;
  z-index: 20;
  width: 250px;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  background: beige;
  border: 2px solid bisque;
  font-size: 0.9em;
  padding: 10px;
  .btn-box {
    height: 30px;
    margin-top: 10px;
    span {
      padding: 5px 10px;
      border: 1.5px solid gray;
      border-radius: 5px;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
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

