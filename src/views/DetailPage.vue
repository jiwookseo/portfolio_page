<template>
  <div>
    <div class="article-content">
      <h3 class="Title">{{article.title || ""}}</h3>
      <p class="Date">{{date}}</p>
      <img class="Img" :src="article.img" />
      <p class="Content">{{article.content}}</p>
    </div>
    <Comment :article="article" :isPortfolio="isPortfolio" />
  </div>
</template>

<script>
import Comment from "../components/Comment";

export default {
  components: {
    Comment
  },
  data() {
    return {};
  },
  computed: {
    isPortfolio() {
      return this.$route.fullPath[3] === "r";
    },
    buttonName() {
      return this.isPortfolio ? "Portfolio" : "Post";
    },
    type() {
      return this.isPortfolio ? "portfolio" : "post";
    },
    link() {
      return `/${this.type}`;
    },
    article() {
      return this.$store.getters.getArticle(this.type, this.$route.params.id);
    },
    date() {
      if (this.article.created_at.seconds === 0) {
        return "";
      } else {
        if (this.article.edited) {
          const date = new Date(this.article.updated_at.seconds * 1000);
          return String(date).split("GMT")[0] + "(edited)";
        } else {
          const date = new Date(this.article.created_at.seconds * 1000);
          return String(date).split("GMT")[0];
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

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
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
  word-break: break-word;
}
.Img {
  width: 100%;
  border-radius: 3px;
  object-fit: cover;
}
</style>
