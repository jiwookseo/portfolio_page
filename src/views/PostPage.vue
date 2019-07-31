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
          <p class="header">All Posts</p>
          <div
            v-for="post in posts"
            :key="post.id"
            class="item"
            :title="post.title"
          >
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
  name: "PostPage",
  components: {
    HeaderSub,
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
