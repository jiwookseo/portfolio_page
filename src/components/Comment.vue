<template>
  <div class="px-4 pb-5">
    <h3>{{comments.length}} Comments</h3>
    <!-- {{article.comments}} -->
    <v-text-field
      v-model="content"
      label="content"
      placeholder="댓글 좀 남겨주세요 관심 줍줍"
      solo
      @keyup.enter="create"
    ></v-text-field>
    <p v-if="!comments.length">Be the first to comment.</p>
    <p v-else v-for="comment in comments" :key="comment.id">{{comment.content}}</p>
  </div>
</template>

<script>
import firestore from "../firebase/firestore";

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
      const getAction = this.isPortfolio ? "getPortfolios" : "getPosts";
      console.log(getAction);
      firestore
        .postComment(this.isPortfolio, this.article.id, this.content) // user
        .then(res => {
          this.$store.dispatch(getAction);
          this.reset();
        })
        .catch(res => console.log(res));
    },
    update() {
      // // 댓글 쓴 사람과 로그인한 유저가 같은 유저인지 확인
      const getAction = this.isPortfolio ? "getPortfolios" : "getPosts";
      firestore
        .updateComment(this.isPortfolio, this.article.id, this.content) // user
        .then(() => {
          this.$store.dispatch(getAction);
          this.reset();
        });
    }
  }
};
</script>

<style scoped>
</style>