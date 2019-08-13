<template>
  <div>
    <HeaderSub />
    <div class="section-content">
      <h2 class="section-title text">Post</h2>
      <div class="article-container">
        <div class="article-detail">
          <vue-page-transition name="fade">
            <router-view :key="$route.fullPath" />
          </vue-page-transition>
        </div>
        <div class="article-list">
          <p class="header">
            <router-link to="/posts" class="back text">
              All Posts
              <i class="material-icons">chevron_right</i>
            </router-link>
          </p>
          <div v-for="post in posts" 
            :key="post.id" 
            class="item"
            :class="{currentPost: post.id === $route.params.id}"
            :title="post.title">
            <router-link
              :to="{name: 'PostDetailPage', params: {id: post.id}}"
              class="post-item-link"
            >
              <div class="Title text">{{ post.title }}</div>
              <div class="Content text">{{post.content}}</div>
              <div class="Author">{{post.userName}}</div>
            </router-link>
          </div>
        </div>
        <div class="article-list-mobile">
          <div class="list">
            <div class="item" 
              v-for="p in paginatedData" 
              :key="p.id"
              :class="{current: p.id === $route.params.id}"
              :title="p.title"
            >
              <router-link :to="{name: 'PostDetailPage', params: {id: p.id}}" class="item-link">
                <p class="Title text">{{p.title}}</p>
                <p class="Author text">{{p.userName}}</p>
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
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import HeaderSub from "@/components/Header/HeaderSub";
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
import article from "@/js/article.js";

export default {
  name: "PostPage",
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
    ...mapGetters(["user", "posts"]),
    pageCount() {
      let l = this.posts.length,
        s = this.paginationSize;
      return Math.floor(l / s) + 1;
    },
    paginatedData() {
      const start = (this.page - 1) * this.paginationSize,
        end = start + this.paginationSize;
      return this.posts.slice(start, end);
    }
  },
  mounted() {
    article.setArticleListSize();
  }
};
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";
@import "@/css/article.scss";
</style>
