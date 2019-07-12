<template>
  <v-app id="app">
    <LoadingSpinner v-show="loading" :message="'translating...'" />
    <v-content class="content">
      <router-view />
      <Footer />
      <div class="chat-btn">
        <i class="material-icons">chat</i>
      </div>
      <div class="tr-btn" @click="askToTranslate = !askToTranslate">
        <i class="material-icons">g_translate</i>
      </div>
      <transition name="slide-fade">
        <div class="tr-box" v-if="askToTranslate">
          <div
            v-text="translated ? 'This page has been translated.' : 'Would you like to translate this page?'"
          ></div>
          <v-select
            class="mt-4 mb-4 pt-0"
            v-if="!translated"
            light
            hide-selected
            hide-details
            append-outer-icon="g_translate"
            :items="langauge"
            label="Select language"
            v-model="selectedLanguage"
          ></v-select>
          <div class="btn-box">
            <span v-if="translated" class="yes" @click="showOrigin">Show Original</span>
            <span v-else class="yes" @click="translate('en', selectedLanguage)">Translate</span>
            <span class="no" @click="askToTranslate = false">Close</span>
          </div>
        </div>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";

const translateURL =
  "https://us-central1-test-68bfc.cloudfunctions.net/translate";

export default {
  name: "App",
  components: {
    Footer,
    LoadingSpinner
  },
  data() {
    return {
      askToTranslate: false,
      loading: false,
      translatedText: {},
      originalText: [],
      textDOMs: [],
      translated: false,
      selectedLanguage: "",
      langauge: [
        {
          text: "Korean",
          value: "ko"
        },
        {
          text: "Japanese",
          value: "ja"
        },
        {
          text: "French",
          value: "fr"
        }
      ]
    };
  },
  mounted() {
    this.textDOMs = document.querySelectorAll(".text");
    this.textDOMs.forEach(dom => this.originalText.push(dom.innerText));
    // 마운트 시에 모든 언어를 번역해 저장해 놓는 방식. 파파고 API 사용량의 문제(일 1만자)로 제한적 사용.
    // const source = "en";
    // this.langauge.forEach(e => {
    //   const target = e.value;
    //   this.translatedText[target] = Array(this.textDOMs.length);

    //   for (let index = 0; index < this.textDOMs.length; index++) {
    //     axios
    //       .get(
    //         `${translateURL}?text=${this.originalText[index]}&source=${source}&target=${target}`
    //       )
    //       .then(res => {
    //         this.translatedText[target][index] =
    //           res.data.message.result.translatedText;
    //       });
    //   }
    // });
  },
  methods: {
    translate: function(source, target) {
      if (this.translated) {
        // console.log("Already translated");
        return;
      } else this.translated = true;
      // console.log("Source languge : " + source);
      // console.log("Target languge : " + target);
      if (
        !this.translatedText[target] ||
        this.translatedText[target] !== this.textDOMs.length
      ) {
        // console.log("Required translate");
        this.loading = true;
        this.translatedText[target] = Array(this.textDOMs.length);
        let counter = 0;
        this.textDOMs.forEach((dom, i) => {
          axios
            .get(
              `${translateURL}?text=${this.originalText[i]}&source=${source}&target=${target}`
            )
            .then(res => {
              this.translatedText[target][i] =
                res.data.message.result.translatedText;
            })
            .then(() => {
              dom.innerText = this.translatedText[target][i];
              counter++;
              if (counter === this.textDOMs.length) {
                this.loading = false;
              }
            });
        });
        // console.log("original text : ", this.originalText);
        // console.log("translated text : ", this.translatedText[target]);
      } else {
        // console.log("Already exist translated text");
        this.textDOMs.forEach(
          (dom, i) => (dom.innerText = this.translatedText[target][i])
        );
      }
    },
    showOrigin: function() {
      if (!this.translated) {
        // console.log("Already loaded origin");
        return;
      } else this.translated = false;
      this.textDOMs.forEach((dom, i) => (dom.innerText = this.originalText[i]));
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
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-3px);
  }
}
.chat-btn,
.tr-btn {
  position: fixed;
  width: 50px;
  height: 50px;
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
  bottom: 20px;
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
    width: 0;
    height: 0;
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
.slide-fade-enter,
.slide-fade-leave-to {
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
div,
span {
  font-family: $font-content;
}
</style>
