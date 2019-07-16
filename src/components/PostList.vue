<template>
  <v-container>
    <v-layout row wrap>
      <v-flex
        class="post"
        v-for="i in posts.length > limit ? limit : posts.length"
        :key="posts[i-1].id"
        xs12
        sm6
        data-aos="fade-up" 
      >
        <h3 class="title text">{{ posts[i-1].title }}</h3>
        <hr />
        <p class="date">{{ date_created(posts[i-1].created_at.seconds) }}</p>
        <p class="content text">{{ posts[i-1].content }}</p>
        <div class="btn-box">
          <div
            class="read-more"
            @click="viewDetail(posts[i-1].title, posts[i-1].content, posts[i-1].created_at.seconds)"
          >Read More</div>
          <div
            class="update"
            @click="openPostWriter(false, posts[i-1].id, posts[i-1].title, posts[i-1].content)"
          >
            <i class="material-icons">edit</i>
          </div>
          <div class="delete" @click="deleteConfirm(posts[i-1].id)">
            <i class="material-icons">delete</i>
          </div>
        </div>
      </v-flex>
      <v-flex v-if="allowCreate" class="post new" xs12 sm6 data-aos="fade-up">
        <span class="text" @click="openPostWriter()">+ New Post</span>
        <hr />
      </v-flex>

      <!-- Dialogs -->
      <v-dialog v-model="dialogWrite" width="500" persistent>
        <PostWriteDialog
          @child="parents"
          @child_snackbar="parent_snackbar"
          @child_updatePost="parent_updatePost"
          :createMode="createMode"
          :id="id"
          :title="title"
          :content="content"
        />
      </v-dialog>
      <v-dialog v-model="dialogDetail" width="500">
        <PostDetailDialog 
          @child_detail="parent_detail"
          :id="id" :title="title" :content="content" :created_at="created_at" />
      </v-dialog>

      <!-- Snackbars -->
      <v-snackbar
        v-model="snackbar_del"
        top
        auto-height
        :timeout="0"
        color="#FF5E61"
        class="snackbar-del"
      >
        <div class="snackbar-content">
          Delete this post?
          <button @click="deletePost(deleteID)" class="del-btn">Delete</button>
          <button @click="snackbar_del = false">Cancel</button>
        </div>
      </v-snackbar>
      <v-snackbar
        v-model="snackbar_alert"
        top
        auto-height
        :timeout="4000"
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
import PostWriteDialog from "./PostWriteDialog";
import PostDetailDialog from "./PostDetailDialog";
import firestore from "../firebase/firestore";
import { setTimeout } from "timers";

export default {
  name: "PostList",
  props: {
    limit: { type: Number, default: 4 },
    allowCreate: { type: Boolean, default: false }
  },
  data() {
    return {
      id: "",
      title: "",
      content: "",
      created_at: 0,
      posts: [],
      dialogWrite: false,
      createMode: true,
      dialogDetail: false,
      snackbar_del: false,
      deleteID: "",
      snackbar_alert: false,
      snackbar_msg: ""
    };
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
    openPostWriter(create = true, id = "", title = "", content = "") {
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
    async deletePost(id) {
      await firestore.deletePost(id);
      await this.getPosts();
      this.snackbar_del = false;
      this.triggerSnackbarAlert("Post deleted");
    },
    async parent_updatePost() {
      await this.getPosts();
    },
    parent_snackbar(msg) {
      this.triggerSnackbarAlert(msg);
    },
    parents() {
      this.dialogWrite = false;
    },
    parent_detail() {
      this.dialogDetail = false;
    },
    viewDetail(title, content, created_at) {
      this.title = title;
      this.content = content;
      this.created_at = created_at;
      this.dialogDetail = true;
    },
    date_created(created_at) {
      const date = new Date(created_at * 1000);
      return String(date).split("GMT")[0];
    }
  }
};
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
    transition: all 0.2s;
  }
  .date {
    color: $gray;
    font-size: 0.8em;
    margin-top: 10px;
  }
  .content {
    @include line-clamp-4;
    margin: 5px 0 10px;
    // min-height: 83.2px;
  }
  &.new {
    hr {
      background: $light-gray;
      border-color: $light-gray;
    }
    span {
      display: inline-block;
      width: 60%;
      font-size: 1.5em;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      color: $light-gray;
      &:hover {
        color: #181818;
      }
    }
    span:hover ~ hr {
      background: $blue-accent;
      border-color: $blue-accent;
    }
  }
}

.btn-box {
  & > div {
    float: left;
  }
  .read-more {
    margin-right: 10px;
    display: inline-block;
    padding: 5px 10px;
    font-size: 0.9em;
    cursor: pointer;
    color: $blue-accent;
    border: 3px solid $blue-accent;
    border-radius: 3px;
    box-shadow: 0 0 2px $blue-accent;
    position: relative;
    transition: all 0.2s;
    &:hover {
      color: #00C0FF;
      border-color: #00C0FF;
      box-shadow: none;
    }
    &:active {
      color: #0071b2;
      border-color: #0071b2;
    }
  }
  .update,
  .delete {
    cursor: pointer;
    margin: 5px 0px 0;
    transform-origin: bottom;
    &:hover {
      animation: jiggle 0.15s linear 0.2s 4 forwards;
    }
    i {
      font-size: 1.5em;
      color: $gray;
    }
  }
}
@keyframes jiggle {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
