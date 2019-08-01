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
        <div class="article-list-mobile">
          <div class="list">
            <div class="item" v-for="p in paginatedData" :key="p.id">
              <router-link 
                :to="{name: 'PortfolioDetailPage', params: {id: p.id}}"
                class="item-link"
              >
                <p class="Title">{{p.title}}</p>
                <p class="Author">{{p.userName}}</p>
              </router-link>
            </div>
          </div>
          <div class="pagination-container">
            <v-pagination
              v-model="page"
              :length="pageCount"
              :page="page"
              total-visible="5"
              color="#00A2FF"
              class="paginator"
            >
            </v-pagination>
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
    return {
      page: 1,
      paginationSize: 4
    };
  },
  computed: {
    ...mapGetters(["user", "portfolios"]),
    pageCount() {
      let l = this.portfolios.length,
          s = this.paginationSize;
      return Math.floor(l/s);
    },
    paginatedData() {
      const start = (this.page - 1) * this.paginationSize,
            end = start + this.paginationSize;
      return this.portfolios.slice(start, end);
    }
  },
  mounted() {
    this.addLog();
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
