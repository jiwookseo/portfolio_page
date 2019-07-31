<template>
  <div>
    <HeaderSub />
    <div class="section-content">
      <h2 class="section-title text">Portfolio</h2>
      <div class="article-container">
        <div class="article-detail">
          <vue-page-transition name="fade">
            <router-view :key="$route.fullPath" />
          </vue-page-transition>
        </div>
        <div class="article-list">
          <p class="header">All Portfolios</p>
          <div
            v-for="portfolio in portfolios"
            :key="portfolio.id"
            class="item"
            :title="portfolio.title"
          >
            <router-link 
              :to="{name: 'PortfolioDetailPage', params: {id: portfolio.id}}"
              class="portfolio-item-link"
            >
              <img :src="portfolio.img" />
              <div class="Title text">{{ portfolio.title }}</div>
              <div class="Content text">{{portfolio.content}}</div>
              <div class="Author">{{portfolio.userName}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import firestore from "../firebase/firestore";
import HeaderSub from "../components/HeaderSub";
import Footer from "../components/Footer";
import { mapGetters } from "vuex";

export default {
  name: "PortfolioPage",
  components: {
    HeaderSub,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user", "portfolios"])
  },
  mounted() {
    this.addLog();
    this.$store.dispatch("getArticles", "portfolios");
  },
  methods: {
    addLog() {
      let username = "";
      if (!this.user) {
        username = "Anonymous User";
      } else {
        username = this.user.email;
      }
      let time = new Date();
      firestore.addLog("/portfolio", username, time.getDay());
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";
</style>
