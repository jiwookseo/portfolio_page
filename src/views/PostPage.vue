<template>
  <div>
    <HeaderSub />
    <div class="section-content">
      <h2 class="section-title text">Post</h2>
      <div class="article-container">
        <div class="article-detail">
          <router-view />
        </div>
        <div class="article-list">
          <div
            v-for="post in posts"
            :key="post.id"
            class="item"
          >
            <router-link 
              :to="{name: 'PostDetailPage', params: {id: post.id}}"
              class="item-link text"
            >
              {{ post.title }}
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
import PostList from "../components/PostList";
import Footer from "../components/Footer";
import { mapGetters } from "vuex";

export default {
  name: "PostPage",
  components: {
    HeaderSub,
    PostList,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user", "posts"])
  },
  mounted() {
    this.addLog();
    this.$store.dispatch("getArticles", "posts");
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
      firestore.addLog("/post", username, time.getDay());
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";
</style>
