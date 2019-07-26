<template>
  <div>
    <div class="btn-box">
      <router-link to="/">
        <div class="load-more-btn">Home</div>
      </router-link>
    </div>
    <div class="btn-box">
      <router-link to="/portfolio">
        <div class="load-more-btn">Portfolios</div>
      </router-link>
    </div>
    <div class="portfolio-content">
      <h3 class="Title">{{portfolio.title}}</h3>
      <p class="Date">{{date_created(portfolio.created_at.seconds)}}</p>
      <img class="Img" :src="portfolio.img" />
      <p class="Content">{{portfolio.content}}</p>
    </div>
    <Comment :isPortfolio="true" :article="portfolio" />
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
    portfolio() {
      return this.$store.getters.getPortfolio(this.$route.params.id);
    }
  },
  mounted() {
    this.$store.dispatch("getArticle", "portfolios");
  },
  methods: {
    date_created(created_at) {
      if (created_at === 0) {
        return "";
      } else {
        const date = new Date(created_at * 1000);
        return String(date).split("GMT")[0];
      }
    }
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

.portfolio-content {
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

#disqus_thread {
  margin-bottom: 50px;
}
</style>
