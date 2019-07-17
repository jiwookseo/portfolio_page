<template>
  <div class="dialog-outer">
    <div class="btn-box-top">
      <div class="cancel-btn" @click="closeDialog">
        <i class="material-icons">close</i>
      </div>
    </div>
    <div class="scrollable-content">
      <h2 class="Title article-dialog">{{ article.title }}</h2>
      <p class="Date">{{date_created}}</p>
      <img
        v-if="isPortfolio"
        :src="article.img"
        class="Img"
        :alt="article.title + ' (article image)'"
      />
      <p class="Content article-dialog">{{article.content}}</p>
    </div>
    <LoadingSpinner v-show="loading" :message="'Translating...'" />
    <div class="btn-box-bottom">
      <div class="tr-btn" @click="askToTranslate = !askToTranslate" title="Translate">
        <i class="material-icons">g_translate</i>
      </div>
      <transition name="slide-fade">
        <div class="tr-box" v-if="askToTranslate">
          <div
            v-text="translated ? 'This article has been translated.' : 'Would you like to translate this article?'"
          ></div>
          <v-select
            class="my-4 pt-0"
            v-if="!translated"
            light
            hide-selected
            hide-details
            append-outer-icon="g_translate"
            :items="language"
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
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner";
import { setTimeout } from "timers";
import translateDOM from "../js/translate";

export default {
  name: "DetailDialog",
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
      language: [
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
    article: { type: Object },
    dialogDetail: { type: Boolean, default: false },
    isPortfolio: { type: Boolean, default: false }
  },
  watch: {
    dialogDetail: function() {
      this.askToTranslate = false;
    },
    article: function() {
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
      const date = new Date(this.article.created_at.seconds * 1000);
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
        this.textDOMs = this.$el.querySelectorAll(".article-dialog");
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
  word-break: break-word;
}
</style>