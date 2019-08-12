<template>
  <div class="comment-box">
    <div class="title font-weight-bold mb-4 ml-1">{{comments.length}} Comments</div>
    <!-- {{article.comments}} -->
    <v-text-field
      v-if="user"
      v-model="content"
      label="content"
      placeholder="댓글 좀 남겨주세요 관심 줍줍"
      solo
      @keyup.enter="createComment"
    ></v-text-field>
    <v-text-field
      v-else
      value="댓글 좀 남겨주세요 관심 줍줍, 그 전에 로그인 부터..."
      label="content"
      solo
      @click="dialog=true"
    ></v-text-field>
    <v-dialog v-model="dialog" class="login-dialog" width="300" persistent>
      <LoginDialog @child="parents" :dialog="dialog" />
    </v-dialog>
    <v-card>
      <v-list v-if="!comments.length">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Be the first to comment.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list one-line v-else>
        <v-list-item v-for="(comment, i) in comments" :key="comment.id">
          <v-list-item-content class="py-0">
            <v-layout>
              <v-flex xs11>
                <v-textarea
                  flat
                  solo
                  auto-grow
                  rows="1"
                  persistent-hint
                  spellcheck="false"
                  v-model="comment.content"
                  :hint="comment.userName"
                  :readonly="!edit || selected !== i"
                  :dark="edit && selected === i"
                />
              </v-flex>
              <v-flex xs1 v-if="user && (user.authority === '1' || user.id === comment.userID)">
                <div class="btn-box" v-if="!edit || selected !== i">
                  <div class="update" @click="commentEdit(comment, i)">
                    <i class="material-icons">edit</i>
                  </div>
                  <div class="delete" @click="deleteConfirm(comment, i)">
                    <i class="material-icons">delete</i>
                  </div>
                </div>
                <div class="btn-box" v-else>
                  <div class="update" @click="updateComment(comment)">
                    <i class="material-icons">done</i>
                  </div>
                  <div class="delete" @click="editCancel(comment)">
                    <i class="material-icons">clear</i>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import firestore from "@/firebase/firestore";
import { mapGetters } from "vuex";
import LoginDialog from "@/components/Header/LoginDialog";

export default {
  name: "Comment",
  components: { LoginDialog },
  props: {
    isPortfolio: { type: Boolean, default: false },
    article: { type: Object }
  },
  data() {
    return {
      content: "",
      selected: -1,
      editContent: "",
      edit: false,
      deleteAim: {},
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["user", "askSnackbar"]),
    comments() {
      return this.article.comments || [];
    }
  },
  watch: {
    askSnackbar() {
      if (this.askSnackbar.confirm === "comment") {
        this.deleteComment();
      }
    }
  },
  methods: {
    deleteConfirm(comment) {
      this.$store.dispatch("setAskSnackbar", {
        ask: true,
        message: "Delete this comment?",
        button: "Delete",
        type: "comment"
      });
      this.deleteAim = comment;
    },
    commentEdit(comment, i) {
      this.edit = true;
      this.selected = i;
      this.originalContent = comment.content;
    },
    editClear() {
      this.edit = false;
      this.selected = -1;
      this.originalContent = "";
    },
    editCancel(comment) {
      comment.content = this.originalContent;
      this.editClear();
    },
    reset() {
      this.content = "";
    },
    createComment() {
      if (this.user) {
        firestore
          .postComment(
            this.isPortfolio,
            this.article.id,
            this.content,
            this.user
          )
          .then(() => {
            this.$store.dispatch(
              "getArticles",
              this.isPortfolio ? "portfolios" : "posts"
            );
            this.reset();
          });
      }
    },
    updateComment(comment) {
      if (this.user && this.user.id === comment.userID) {
        firestore
          .updateComment(
            this.isPortfolio,
            this.article.id,
            comment.id,
            comment.content
          )
          .then(() => {
            this.$store.dispatch(
              "getArticles",
              this.isPortfolio ? "portfolios" : "posts"
            );
            this.editClear();
          });
      }
    },
    deleteComment() {
      if (this.user && this.user.id === this.deleteAim.userID) {
        firestore
          .deleteComment(this.isPortfolio, this.article.id, this.deleteAim.id)
          .then(() => {
            this.$store.dispatch(
              "getArticles",
              this.isPortfolio ? "portfolios" : "posts"
            );
            this.editClear();
            this.$store.dispatch("setAlertSnackbar", {
              alert: true,
              message: "Comment deleted"
            });
          });
      }
    },
    parents(dialog) {
      this.dialog = dialog;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/style.scss";

.comment-box {
  width: 100%;
  padding: 50px 3%;
}
.btn-box {
  position: absolute;
  top: 15%;
  right: 10px;
}
.delete,
.update {
  color: #3f3f3f;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  transform-origin: bottom;
  i {
    font-size: 1.2em;
  }
  &:hover {
    animation: jiggle 0.15s linear 0.2s 4 forwards;
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