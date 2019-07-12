<template>
    <v-container>
        <v-layout row wrap>
            <v-flex class="post" @click="viewDetail(posts[i-1].title, posts[i-1].content)" v-for="i in posts.length > limit ? limit : posts.length" :key="posts[i-1].id" xs12 sm6>
                <h3 class="text">{{ posts[i-1].title }}</h3>
                <p class="text">{{ posts[i-1].content }}</p>
            </v-flex>
            <v-flex v-if="allowCreate" @click="dialogWrite = true" class="post" xs12 sm6>
                <span class="text">+ New Post</span>
            </v-flex>
            <v-dialog v-model="dialogWrite" width="600">
                <PostWriteDialog @child="parents" />
            </v-dialog>
            <v-dialog v-model="dialogDetail" width="500">
                <PostDetailDialog :currTitle=currTitle :currContent=currContent />
            </v-dialog>
        </v-layout>
    </v-container>
</template>


<script>
import PostWriteDialog from './PostWriteDialog';
import PostDetailDialog from './PostDetailDialog';
import firestore from '../firebase/firestore';

export default {
  name: "PostList",
  props: {
    limit: {type: Number, default: 4},
    allowCreate: {type: Boolean, default: false}
  },
  data() {
    return {
      title: '',
      content: '',
      posts: [],
      dialogWrite: false,
      dialogDetail: false,
      currTitle: '',
      currContent: ''
    }
  },
  mounted() {
    this.getPosts();
  },
  components: {
        PostWriteDialog,
        PostDetailDialog
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
    },
    parents(dialogWrite) {
      this.dialogWrite = dialogWrite;
    },
    viewDetail(title, content) {
        this.currTitle = title;
        this.currContent = content;
        this.dialogDetail = true;
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

.post {
    border: 1px solid;
    padding: 10px;
    cursor: pointer;
    h3 {
        @include textTruncate;
    }
    p {
        @include line-clamp-4;
    }
}
</style>
