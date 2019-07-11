<template>
<div class="posts-container">
  <v-layout row wrap mw-700>
    <v-flex v-for="i in posts.length > limits ? limits : posts.length" :class="'xs' + 12 / column" px-3>
      <Post :date="posts[i - 1].created_at" :title="posts[i - 1].title" :content="posts[i - 1].content"></Post>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
    </v-flex>
  </v-layout>
</div>
</template>


<script>
import Post from '@/components/Post'
import firestore from '../firebase/firestore';

export default {
  name: "PostList",
  props: {
    limit: {
      type: Number,
      default: 4
    },
    loadMore: {type: Boolean, default: true}
  },
  data() {
    return {
      title: '',
      content: '',
      posts: []
    }
  },
  mounted() {
    this.getPosts();
  },
  components: {
		Post
	},
  methods: {
    async getPosts() {
      this.posts = await firestore.getPosts();
    },
    loadMorePosts() {
      this.loadMore = false
      this.limits = this.posts.length;
    },
    postPost() {
      firestore.postPost(this.title, this.content);
      this.title = '';
      this.content = '';
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
</style>
