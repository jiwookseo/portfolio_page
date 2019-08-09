<template>
  <div>
    <HeaderSub />
    <div class="content">
      <h2 class="section-title text">{{this.path === "/portfolios" ? "Portfolio" : "Post"}}</h2>
      <PortfolioList v-if="path === '/portfolios'" :limit="6" :allowCreate="true" />
      <PostList v-if="path === '/posts'" :limit="6" :allowCreate="true" />
    </div>
    <Footer />
  </div>
</template>

<script>
import HeaderSub from "@/components/Header/HeaderSub";
import PortfolioList from "@/components/Article/PortfolioList";
import PostList from "@/components/Article/PostList";
import Footer from "@/components/Footer";

export default {
  name: "Articles",
  components: {
    HeaderSub,
    PortfolioList,
    PostList,
    Footer
  },
  computed: {
    path() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/css/style.scss";

.content {
  margin: 80px 0 50px;
  height: auto;
  min-height: 100vh;
}

</style>
