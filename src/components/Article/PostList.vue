<template>
  <v-container class="vContainer">
    <v-layout row wrap>
      <v-flex
        class="post"
        v-for="i in posts.length > postLimit ? postLimit : posts.length"
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
          <div>
            <router-link :to="{name: 'PostDetailPage', params: {id: posts[i-1].id}}">
              <div class="read-more">Read More</div>
            </router-link>
          </div>
          <div
            class="update"
            @click="updateArticle(posts[i-1].id)"
            v-if="user && (user.authority==='1' || user.id === posts[i-1].userID)"
          >
            <i class="material-icons">edit</i>
          </div>
          <div
            class="delete"
            @click="deleteConfirm(i)"
            v-if="user && (user.authority==='1' || user.id === posts[i-1].userID)"
          >
            <i class="material-icons">delete</i>
          </div>
        </div>
      </v-flex>
      <v-flex v-if="allowCreate && isAdmin" class="post new" xs12 sm6 data-aos="fade-up">
        <span class="text" @click="writeNewArticle">+ New Post</span>
        <hr />
      </v-flex>

      <div class="section-btn-box" v-if="allowCreate && postLimit < posts.length">
        <div class="load-more-btn" @click="loadMore">Load More</div>
      </div>
      
    </v-layout>
  </v-container>
</template>


<script>
import firestore from "@/firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: "PostList",
  props: {
    limit: { type: Number, default: 6 },
    allowCreate: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(["askSnackbar", "user", "posts"]),
    ...mapGetters({ isAdmin: "checkIfAdmin" })
  },
  watch: {
    limit: function() {
      this.postLimit = this.limit;
    },
    askSnackbar() {
      if (this.askSnackbar.confirm === "post") {
        this.deletePost();
      }
    }
  },
  data() {
    return {
      selectedId: -1,
      dialogWrite: false,
      deleteID: "",
      postLimit: 6
    };
  },
  methods: {
    writeNewArticle() {
      this.$router.replace({name: 'NewPost'})
    },
    updateArticle(id) {
      this.$router.replace({name: 'PostUpdate', params: {id: id}})
    },
    openPostWriter(index = -1) {
      this.selectedId = index === -1 ? "" : this.posts[index - 1].id;
      this.dialogWrite = true;
    },
    deleteConfirm(index) {
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: "Delete this post?",
        button: "Delete",
        type: "post"
      });
      this.deleteID = this.posts[index - 1].id;
    },
    deletePost() {
      firestore.deleteArticle("posts", this.deleteID).then(() => {
        this.$store.dispatch("getArticles", "posts");
        this.deleteID = "";
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: "Post deleted"
        });
      });
    },
    parents() {
      this.dialogWrite = false;
    },
    date_created(created_at) {
      const date = new Date(created_at * 1000);
      return String(date).split("GMT")[0];
    },
    loadMore() {
      this.postLimit += 6;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";

a,
a:hover {
  color: initial;
}
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
    word-break: break-word;
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
      color: #00c0ff;
      border-color: #00c0ff;
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
