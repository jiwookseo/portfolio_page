<template>
    <v-container>
        <v-layout row wrap>
            <v-flex class="post" v-for="i in posts.length > limit ? limit : posts.length" :key="posts[i-1].id" xs12 sm6>
                <h3 class="title text">{{ posts[i-1].title }}</h3>
                <hr />
                <p class="date">{{ date_created(posts[i-1].created_at.seconds) }}</p>
                <p class="content text">{{ posts[i-1].content }}</p>
                <div class="read-more" @click="viewDetail(posts[i-1].title, posts[i-1].content)">Read More</div>
            </v-flex>
            <v-flex v-if="allowCreate" @click="dialogWrite = true" class="post" xs12 sm6>
                <span class="text">+ New Post</span>
            </v-flex>
            <v-dialog v-model="dialogWrite" width="600" persistent>
                <PostWriteDialog @child="parents" />
            </v-dialog>
            <v-dialog v-model="dialogDetail" width="500">
                <PostDetailDialog :title=title :content=content :created_at=created_at />
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
      created_at: 0,
      posts: [],
      dialogWrite: false,
      dialogDetail: false,
    //   currTitle: '',
    //   currContent: ''
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
    parents(dialogWrite) {
      this.dialogWrite = dialogWrite;
    },
    viewDetail(title, content) {
        this.title = title;
        this.content = content;
        this.dialogDetail = true;
    },
    date_created(created_at) {
        const date = new Date(created_at * 1000);
        return date
    }
  },

}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

.post {
    padding: 25px;
    h3 {
        @include textTruncate;
        font-size: 1.5em;
        font-weight: 700;
        padding-bottom: 6px;
    }
    hr {
        width: 70%;
        border: 1px solid $nav-bg;
        border-radius: 3px;
    }
    .date {
        color: gray;
        font-size: 0.8em;
        margin-top: 10px;
    }
    .content {
        @include line-clamp-4;
        margin: 5px 0 10px;

    }
    .read-more {
        display: inline-block;
        padding: 5px 10px;
        background: $nav-bg;
        font-size: 0.9em;
        cursor: pointer;
    }
}
</style>
