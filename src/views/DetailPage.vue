<template>
  <div>
    <div class="article-content">
      <h3 class="Title text">{{article.title || ""}}</h3>
      <div class="article-meta">
        <p class="Author">{{article.userName}}</p>
        <p class="Date">{{date}}</p>
        <div class="btn-box" v-if="user && (user.authority==='1' || user.id === article.userID)">
          <div class="update" @click="updateArticle">
            <i class="material-icons">edit</i>
          </div>
          <div class="delete" @click="deleteConfirm()">
            <i class="material-icons">delete</i>
          </div>
        </div>
      </div>
      <img 
        v-if="isPortfolio" 
        class="Img" 
        title="Click image to view full size"
        :src="article.img" 
        @click="openImgDialog(article.img)" 
      />
      <p class="Content text">{{article.content}}</p>
    </div>
    <Comment :article="article" :isPortfolio="isPortfolio" />
    <v-dialog
      v-model="dialogImg"
      max-width="800"
    >
      <div class="dialog-outer">
        <img 
          :src="dialogImgURL" 
          alt="Portfolio Image" 
        >
        <div class="cancel-btn" @click="closeDialog">
          <i class="material-icons">close</i>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import firestore from "@/firebase/firestore";
import Comment from "@/components/Article/Comment";
import { mapGetters } from "vuex";

export default {
  components: {
    Comment
  },
  data() {
    return {
      selectedID: "",
      dialogWrite: false,
      deleteID: "",
      dialogImg: false,
      dialogImgURL: ""
    };
  },
  computed: {
    ...mapGetters(["askSnackbar", "user"]),
    isPortfolio() {
      return this.$route.fullPath[3] === "r";
    },
    buttonName() {
      return this.isPortfolio ? "Portfolio" : "Post";
    },
    type() {
      return this.isPortfolio ? "portfolio" : "post";
    },
    link() {
      return `/${this.type}`;
    },
    article() {
      return this.$store.getters.getArticle(this.type, this.$route.params.id);
    },
    date() {
      if (this.article.created_at.seconds === 0) {
        return "";
      } else {
        if (this.article.edited) {
          const date = new Date(this.article.updated_at.seconds * 1000);
          return String(date).split("GMT")[0] + "(edited)";
        } else {
          const date = new Date(this.article.created_at.seconds * 1000);
          return String(date).split("GMT")[0];
        }
      }
    }
  },
  watch: {
    askSnackbar() {
      if (this.askSnackbar.confirm === "article") {
        this.deleteArticle();
      }
    }
  },
  methods: {
    openImgDialog(url) {
      this.dialogImgURL = url;
      this.dialogImg = true;
    },
    closeDialog() {
      this.dialogImg = false;
    },
    updateArticle() {
      if (this.isPortfolio) {
        this.$router.replace({name: 'PortfolioUpdate', params: {id: this.$route.params.id}});
      }
      else {
        this.$router.replace({name: 'PostUpdate', params: {id: this.$route.params.id}});
      }
    },
    deleteConfirm() {
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: this.isPortfolio
          ? "Delete this portfolio?"
          : "Delete this post?",
        button: "Delete",
        type: "article"
      });
    },
    deleteArticle() {
      firestore.deleteArticle(this.type + "s", this.article.id).then(() => {
        this.$store.dispatch("getArticles", this.type + "s");
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: this.isPortfolio ? "Portfolio deleted" : "Post deleted"
        });
        this.$router.replace(this.isPortfolio ? "/portfolios" : "/posts");
      });
    },
  }
};
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";

.article-content {
  width: 100%;
  padding: 10px 3%;
}

.article-meta {
  position: relative;
  .btn-box {
    width: 45px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 20px;
    .delete,
    .update {
      display: inline-block;
      margin-left: 5px;
      cursor: pointer;
      color: $gray;
      transform-origin: bottom;
      i {
        font-size: 1.1em;
      }
      &:hover {
        animation: jiggle 0.15s linear 0.2s 4 forwards;
      }
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

.Title {
  font-size: 2em;
  margin-bottom: 20px;
  @include mobile {
    font-size: 1.7em;
  }
}
.Author {
  margin: 0;
  color: $gray;
  text-transform: uppercase;
}
.Date {
  color: $gray;
  margin-bottom: 10px;
}
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: justify;
}
.Img {
  width: 100%;
  max-height: 350px;
  border-radius: 3px;
  object-fit: cover;
}

.dialog-outer {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  img {
    width: 100%;
    background: white;
    border-radius: 5px;
  }
  .cancel-btn {  // Dialog Close Button (gray X)
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    i {
      color: gray;
      @include centerItem;
      font-size: 2.5em;
    }
  }
}


</style>
