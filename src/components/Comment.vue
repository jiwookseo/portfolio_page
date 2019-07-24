<template>
  <div class="px-4 pb-5">
    <h3>{{comments.length}} Comments</h3>
    <!-- {{article.id}} -->
    <v-text-field
      v-model="content"
      label="content"
      placeholder="Leave a comment for contact us"
      solo
    ></v-text-field>
    <p v-if="comments">Be the first to comment.</p>
    <p v-else v-for="comment in comments" :key="comment.id">{{comment.content}}</p>
  </div>
</template>

<script>
import { firestore } from "firebase";
export default {
  name: "Comment",
  components: {},
  props: {
    isPortfolio: { type: Boolean, default: false },
    article: { type: Object, default: { id: 1 } }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    comments() {
      return this.article.comments || [];
    }
  },
  methods: {
    reset() {
      this.content = "";
    },
    create() {
      // 로그인한 유저인지 확인
      const commentAction = this.isPortfolio
        ? firestore.postPortfolioComment()
        : firestore.postPostComment();
      const name = this.isPortfolio
        ? "PortfolioDetailPage"
        : "PostfolioDetailPage";
      const getAction = this.isPortfolio ? "getPosts" : "getPortfolios";
      commentAction(this.article.id, this.content, user).then(() => {
        this.$store.dispatch(getAction);
        this.reset();
      });
    },
    update() {
      // // 댓글 쓴 사람과 로그인한 유저가 같은 유저인지 확인
      const commentAction = this.isPortfolio
        ? firestore.updatePortfolioComment()
        : firestore.updatePostComment();
      const name = this.isPortfolio
        ? "PortfolioDetailPage"
        : "PostfolioDetailPage";
      const getAction = this.isPortfolio ? "getPosts" : "getPortfolios";
      commentAction(this.article.id, this.content, user).then(() => {
        this.$store.dispatch(getAction);
        this.reset();
      });
    }
  }
};
</script>

<style scoped>
</style>