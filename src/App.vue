<template>
  <v-app id="app">
    <v-content class="content">
      <router-view />
      <Footer />
      <div class="chat-btn"><i class="material-icons">chat</i></div>
      <div class="tr-btn" @click="askToTranslate = !askToTranslate"><i class="material-icons">g_translate</i></div>
      <transition name="slide-fade">
        <div class="tr-box" v-if="askToTranslate">
          Would you like to translate this page?
          <div class="btn-box">
            <span class="yes" @click="translate">Translate</span>
            <span class="no" @click="askToTranslate = false">No</span>
          </div>
        </div>
      </transition>
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
      askToTranslate: false
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
@import "./css/style.scss";

.content {
  position: relative;
}

@keyframes bobup {
  0% {transform: translateY(0px);}
  100% {transform: translateY(-3px);}
}
.chat-btn, .tr-btn {
  position: fixed;
  width: 50px; height: 50px;
  border-radius: 50%;
  right: 20px;
  background: $blue-accent;
  z-index: 15;
  cursor: pointer;
  i {
    @include centerItem;
    color: white;
  }
  &:hover {
    animation: bobup 0.5s ease-in-out infinite alternate;
  }
}
.chat-btn {
  bottom: 20px; 
}
.tr-btn {
  bottom: 80px;
}
.tr-box {
  position: fixed;
  z-index: 15;
  width: 250px;
  bottom: 65px;
  right: 85px;
  border-radius: 10px;
  background: $nav-highlight;
  border: 2px solid $nav-bg;
  font-size: 0.9em;
  padding: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 40%;
    width: 0; height: 0;
    border-top: 7px solid transparent;
    border-left: 10px solid $nav-bg;
    border-bottom: 7px solid transparent;

  }
  .btn-box {
    height: 30px;
    margin-top: 10px;
    span {
      padding: 5px 10px;
      background: linear-gradient(to bottom, $nav-highlight, $nav-bg);
      border: 1.5px solid $nav-bg;
      border-radius: 5px;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
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
div, span {
  font-family: $font-content;
}
</style>

