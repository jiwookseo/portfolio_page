<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="post" v-for="i in posts.length > limit ? limit : posts.length" :key="posts[i-1].id" xs12 sm6>
        <h3 class="title text">{{ posts[i-1].title }}</h3>
        <hr />
        <p class="date">{{ date_created(posts[i-1].created_at.seconds) }}</p>
        <p class="content text">{{ posts[i-1].content }}</p>
        <div class="read-more" @click="viewDetail(posts[i-1].title, posts[i-1].content, posts[i-1].created_at.seconds)">Read More</div>
      </v-flex>
      <v-flex v-if="allowCreate" @click="openPostWriter" class="post" xs12 sm6>
        <span class="text">+ New Post</span>
      </v-flex>

      <!-- Dialogs -->
      <v-dialog v-model="dialogWrite" width="500" persistent>
        <PostWriteDialog 
          @child="parents"
          @child_snackbar="parent_snackbar"
          :createMode=createMode
          :id="id"
          :title="title"
          :content="content"
        />
      </v-dialog>
      <v-dialog v-model="dialogDetail" width="500">
        <PostDetailDialog 
          :id="id"
          :title=title 
          :content=content 
          :created_at=created_at />
      </v-dialog>

      <!-- Snackbars -->
      <v-snackbar 
        v-model="snackbar_del" 
        top auto-height :timeout="0"
        color="#FF5E61"
        class="snackbar-del"
      >
        <div class="snackbar-content">
          Delete this post?
          <button @click="deletePost(deleteID)" class="del-btn">Delete</button>
          <button @click="snackbar_del = false" class="cancel-btn">Cancel</button>
        </div>
      </v-snackbar>
      <v-snackbar 
        v-model="snackbar_alert" 
        top auto-height :timeout="4000"
        color="#FF5E61"
        class="snackbar-alert"
      >
        <div class="snackbar-content">
          {{ snackbar_msg }}
          <button @click="snackbar_alert = false" class="ok-btn">OK</button>
        </div>
      </v-snackbar>
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
      id: '',
      title: '',
      content: '',
      created_at: 0,
      posts: [],
      dialogWrite: false,
      createMode: true,
      dialogDetail: false,
      snackbar_del: false,
      deleteID: '',
      snackbar_alert: false,
      snackbar_msg: ''
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
    openPostWriter(
      create = true,
      id = "",
      title = "",
      content = ""
    ) {
      this.createMode = create;
      this.id = id;
      this.title = title;
      this.content = content;
      this.dialogWrite = true;
    },
    deleteConfirm(id) {
      this.snackbar_del = true;
      this.deleteID = id;
    },
    triggerSnackbarAlert(msg) {
      this.snackbar_msg = msg;
      this.snackbar_alert = true;
    },
    deletePost(id) {
      firestore.deletePost(id);
      this.snackbar_del = false;
      this.triggerSnackbarAlert("Post deleted");
    },
    parent_snackbar(msg) {
      this.triggerSnackbarAlert(msg);
    },
    parents(dialogWrite) {
      this.dialogWrite = dialogWrite;
    },
    viewDetail(title, content, created_at) {
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.dialogDetail = true;
    },
    date_created(created_at) {
        const date = new Date(created_at * 1000);
        return String(date).split('(')[0]
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
    width: 60%;
    background: $blue-accent;
    border: 1.2px solid $blue-accent;
    border-radius: 2px;
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
    font-size: 0.9em;
    cursor: pointer;
    color: $blue-accent;
    border: 2px solid $blue-accent;
    border-radius: 3px;
    box-shadow: 0 5px $blue-accent;
    position: relative;
    &:hover {
      box-shadow: 0 3px $blue-accent;
      top: 2px;
    }
    &:active {
      box-shadow: none;
      top: 5px;
    }
  }
}
</style>
