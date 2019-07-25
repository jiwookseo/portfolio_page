<template>
  <div class="comment-box">
    <div class="title font-weight-bold mb-4 ml-1">{{comments.length}} Comments</div>
    <!-- {{article.comments}} -->
    <v-text-field
      v-model="content"
      label="content"
      placeholder="댓글 좀 남겨주세요 관심 줍줍"
      solo
      @keyup.enter="create"
    ></v-text-field>
    <v-card>
      <v-list v-if="!comments.length">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Be the first to comment.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list two-line v-else>
        <v-list-item v-for="comment in comments" :key="comment.id" read-only>
          <v-list-item-content>
            <v-list-item-title>{{comment.content}}</v-list-item-title>
            <v-list-item-subtitle>{{comment.userName}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
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
      if (this.$store.state.user) {
        const getAction = this.isPortfolio ? "getPortfolios" : "getPosts";
        firestore
          .postComment(
            this.isPortfolio,
            this.article.id,
            this.content,
            this.$store.state.user
          ) // user
          .then(res => {
            this.$store.dispatch(getAction);
            this.reset();
          })
          .catch(res => console.log(res));
      }
    },
    update(comment) {
      if (
        this.$store.state.user &&
        this.$store.state.user.id === comment.userID
      ) {
        const getAction = this.isPortfolio ? "getPortfolios" : "getPosts";
        firestore
          .updateComment(this.isPortfolio, comment.id, this.content) // user
          .then(() => {
            this.$store.dispatch(getAction);
            this.reset();
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
.comment-box {
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
</style>