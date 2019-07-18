<template>
  <div class="dialog-outer">
    <div class="btn-box-top">
      <div class="cancel-btn" @click="closeDialog">
        <i class="material-icons">close</i>
      </div>
    </div>
    <div class="scrollable-content">
      <h2 class="Title">{{ title }}</h2>
      <p class="Date">{{date_created}}</p>
      <img
        v-if="img && img!=='http://anzancity.ir/uploads/posts/village-warning.jpg'"
        :src="img"
        class="Img"
        :alt="title + ' (portfolio image)'"
      />
      <p class="Content">{{content}}</p>
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
import translateText from "../js/translate";

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
      originalText: {},
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
      ],
      title: "",
      content: "",
      img: ""
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
      this.title = this.article.title;
      this.content = this.article.content;
      this.img = this.article.img;
      this.originalText = {
        title: this.article.title,
        content: this.article.content
      };
      this.translatedText = {};
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
      if (!this.translatedText[target] || force) {
        this.loading = true;
        this.translatedText[target] = {
          title: "",
          content: ""
        };
        translateText(source, target, this.originalText.title)
          .then(res => {
            this.title = res.translatedText;
            this.translatedText[target].title = res.translatedText;
          })
          .then(
            translateText(source, target, this.originalText.content)
              .then(res => {
                this.content = res.translatedText;
                this.translatedText[target].content = res.translatedText;
              })
              .then(() => (this.loading = false))
          );
      } else {
        this.title = this.translatedText[target].title;
        this.content = this.translatedText[target].content;
      }
    },
    showOrigin: function() {
      if (!this.translated) return;
      else this.translated = false;
      this.title = this.originalText.title;
      this.content = this.originalText.content;
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
  @include mobile {
    font-size: 1.7em;
  }
}
.Date {
  color: $gray;
  margin-bottom: 10px;
}
.Img {
  width: 100%;
  border-radius: 3px;
  object-fit: cover;
}
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
  word-break: break-word;
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