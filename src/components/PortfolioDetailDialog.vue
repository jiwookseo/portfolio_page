<template>
  <div class="dialog-outer">
    <h3 class="Title ptf-dialog">{{portfolio.title}}</h3>
    <p class="Date">{{date_created}}</p>
    <!-- <div class="Img" :style="{'background-image': 'url(' + img + ')'}"></div> -->
    <img :src="portfolio.img" class="Img" :alt="portfolio.title + ' (portfolio image)'" />
    <p class="Content ptf-dialog">{{portfolio.content}}</p>
    <div class="cancel-btn" @click="closeDialog">
      <i class="material-icons">close</i>
    </div>
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
          class="my-4 pt-0"
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
          <span v-if="translated" class="yes" @click="showOrigin">Original</span>
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
import translateDOM from "../js/translate";

export default {
  name: "PortfolioDetailDialog",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      date: "",
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
  props: {
    portfolio: { type: Object },
    dialogDetail: { type: Boolean, default: false }
  },
  watch: {
    dialogDetail: function() {
      this.askToTranslate = false;
    },
    portfolio: function() {
      if (this.translated) {
        this.loading = true;
        setTimeout(() => {
          this.translated = false;
          this.translate("en", this.selectedLanguage, true);
        }, 500);
      }
    }
  },
  computed: {
    date_created() {
      const date = new Date(this.portfolio.created_at.seconds * 1000);
      return String(date).split("GMT")[0];
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
        this.loading = true;
        this.textDOMs = this.$el.querySelectorAll(".ptf-dialog");
        translateDOM(source, target, this.textDOMs).then(res => {
          this.originalText = res.originalText;
          this.translatedText[target] = res.translatedText;
          this.loading = false;
        });
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
    },
    closeDialog() {
      this.$emit("child_detail");
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.dialog-outer {
  width: 100%;
  height: 80vh;
  background: white;
  padding: 30px;
  overflow: auto;
  position: relative;
}
.Title {
  font-size: 2em;
  margin-bottom: 20px;
}
.Date {
  color: $gray;
  margin-bottom: 10px;
}
.Img {
  width: 100%;
  height: 250px;
  @include mobile {
    height: 200px;
  }
  border-radius: 3px;
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  object-fit: cover;
}
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
}

@keyframes bobup {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-3px);
  }
}
.tr-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  right: 20px;
  bottom: 20px;
  background: $blue-accent;
  cursor: pointer;
  i {
    @include centerItem;
    color: white;
  }
  &:hover {
    animation: bobup 0.5s ease-in-out infinite alternate;
  }
}
.tr-box {
  position: absolute;
  width: 200px;
  bottom: 20px;
  right: 85px;
  border-radius: 10px;
  background: white;
  border: 2px solid $blue-accent;
  font-size: 0.9em;
  padding: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    bottom: 15px;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-left: 10px solid $blue-accent;
    border-bottom: 9px solid transparent;
  }
  .btn-box {
    font-size: 0.8em;
    height: 20px;
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
</style>