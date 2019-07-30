<template>
  <div>
    <div class="btn-box">
      <router-link to="/">
        <div class="load-more-btn">Home</div>
      </router-link>
    </div>
    <div class="btn-box">
      <router-link :to="link">
        <div class="load-more-btn">{{buttonName}}</div>
      </router-link>
    </div>
    <div class="article-content">
      <h3 class="Title">{{article.title || ""}}</h3>
      <p class="Date">{{date}}</p>
      <img class="Img" :src="article.img" />
      <p class="Content">{{article.content}}</p>
    </div>
    <Comment :article="article" />
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Comment from "../components/Comment";

export default {
  components: {
    Footer,
    Comment
  },
  data() {
    return {};
  },
  computed: {
    buttonName() {
      return this.$route.fullPath[3] === "r" ? "Portfolio" : "Post";
    },
    type() {
      return this.$route.fullPath[3] === "r" ? "portfolio" : "post";
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
  },
  mounted() {
    this.$store.dispatch("getArticles", this.type + "s");
  }
};
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
a,
a:hover {
  color: initial;
  width: 0;
  height: 0;
}
.btn-box {
  height: 50px;
  position: relative;
  margin-top: 10px;
}
.load-more-btn {
  position: absolute;
}

.article-content {
  width: 60%;
  margin: 50px auto;
  padding: 10px;
  @include viewportMax(800) {
    width: 80%;
  }
  @include mobile {
    width: 100%;
  }
}
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
