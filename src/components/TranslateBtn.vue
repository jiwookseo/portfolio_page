<template>
  <div>
    <LoadingSpinner v-show="loading" :message="'translating...'" />
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
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner";
import { setTimeout } from "timers";
import translateText from "../js/translate";

export default {
  name: "TranslateBtn",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      askToTranslate: false,
      loading: false,
      textDOMs: [],
      originalText: [],
      translatedText: {},
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
  watch: {
    $route() {
      if (this.translated) {
        this.loading = true;
        setTimeout(() => {
          this.translated = false;
          this.translate("en", this.selectedLanguage, true);
        }, 500);
      }
    }
  },
  methods: {
    translate: function(source, target, force = false) {
      if (this.translated) return;
      else this.translated = true;
      if (
        !this.translatedText[target] ||
        this.translatedText[target].length !== this.textDOMs.length ||
        force
      ) {
        this.textDOMs = document.querySelectorAll(".text");
        if (this.textDOMs.length) {
          this.loading = true;
          this.originalText = [];
          this.translatedText[target] = Array(this.textDOMs.length);
          this.textDOMs.forEach(dom => this.originalText.push(dom.innerText));
          let counter = 0;
          this.textDOMs.forEach((dom, i) => {
            this.originalText.push(dom.innerText);
            translateText(source, target, dom.innerText)
              .then(res => {
                dom.innerText = res.translatedText;
                this.translatedText[target][i] = res.translatedText;
                counter++;
                if (counter === this.textDOMs.length) this.loading = false;
              })
              .catch(() => {
                counter++;
                if (counter === this.textDOMs.length) this.loading = false;
              });
          });
        }
      } else {
        this.textDOMs.forEach(
          (dom, i) => (dom.innerText = this.translatedText[target][i])
        );
      }
    },
    showOrigin: function() {
      if (!this.translated) return;
      else this.translated = false;
      this.textDOMs.forEach((dom, i) => (dom.innerText = this.originalText[i]));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/reset.css";
@import "../css/style.scss";
@import "../css/mixin.scss";

@keyframes bobup {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-3px);
  }
}
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
.tr-btn {
  bottom: 80px;
}
.tr-box {
  position: fixed;
  z-index: 15;
  width: 250px;
  bottom: 20px;
  right: 85px;
  border-radius: 5px;
  background: white;
  border: 2px solid $blue-accent;
  font-size: 0.9em;
  padding: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 37%;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-left: 10px solid $blue-accent;
    border-bottom: 9px solid transparent;
  }
  .btn-box {
    height: 30px;
    margin-top: 10px;
    span {
      padding: 5px 10px;
      border-radius: 2px;
      text-transform: uppercase;
      cursor: pointer;
      color: white;
      box-shadow: 0px 0px 3px 0px #9aaebb;
      &:first-child {
        margin-right: 10px;
        background: #19abff;
        &:hover {
          background: $blue-accent;
          box-shadow: none;
        }
      }
      &:last-child {
        background: #9aaebb;
        &:hover {
          background: #8d9cb2;
          box-shadow: none;
        }
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