<template>
  <div class="dialog-outer">
    <div class="btn-box-top">
      <div class="cancel-btn" @click="closeDialog">
        <i class="material-icons">close</i>
      </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="scrollable-content">
        <v-text-field v-model="title" label="Title" required :rules="titleRules"></v-text-field>
        <v-textarea
          v-model="content"
          label="Content"
          required
          :rules="contentRules"
          rows="10"
          auto-grow
        ></v-textarea>
        <div v-if="isPortfolio" class="img-select-box">
          <div class="img-preview">
            <img :src="img" @change="onFilePicked" alt="Current Portfolio Image" />
            <div class="choose-img-prompt" @click="pickFile" title="Change Image">
              <i class="material-icons">image_search</i>
            </div>
          </div>
          <div class="img-picker">
            <v-text-field label="Select Image" @click="pickFile" v-model="img"></v-text-field>
            <input type="file" ref="image" accept="image/*" @change="onFilePicked" />
          </div>
        </div>
      </div>
      <div class="btn-box-bottom">
        <button @click.prevent="reset" class="btn reset-btn">Reset</button>
        <button
          v-if="!article.id"
          @click.prevent="create"
          class="btn create-btn"
          :disabled="!valid"
        >Create</button>
        <button v-else @click.prevent="update" class="btn create-btn" :disabled="!valid">Update</button>
      </div>
    </v-form>
  </div>
</template>


<script>
import firestore from "../firebase/firestore";
import axios from "axios";

export default {
  name: "WriteDialog",
  props: {
    article: { type: Object },
    dialogWrite: { type: Boolean, default: true },
    isPortfolio: { type: Boolean, default: false }
  },
  watch: {
    article: function() {
      if (!this.article.id) {
        this.$refs.form.resetValidation();
      }
    },
    dialogWrite: function() {
      this.title = this.article.title;
      this.content = this.article.content;
      this.img = this.article.img;
    }
  },
  data() {
    return {
      valid: true,
      titleRules: [v => !!v || "Title is required"],
      contentRules: [v => !!v || "Content is required"],
      title: "",
      content: "",
      img: ""
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
      this.img = "http://anzancity.ir/uploads/posts/village-warning.jpg";
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    closeDialog() {
      this.$emit("child");
    },
    triggerParentSnackbar(msg) {
      this.$emit("child_snackbar", msg);
    },
    create() {
      if (this.$refs.form.validate()) {
        if (this.isPortfolio) {
          firestore
            .postPortfolio(this.title, this.content, this.img)
            .then(() => {
              this.$store.dispatch("getPortfolios");
              this.reset();
              this.closeDialog();
              this.triggerParentSnackbar("Portfolio created");
            });
        } else {
          firestore.postPost(this.title, this.content).then(() => {
            this.$store.dispatch("getPost");
            this.reset();
            this.closeDialog();
            this.triggerParentSnackbar("Post created");
          });
        }
      }
    },
    update() {
      if (this.isPortfolio) {
        firestore
          .updatePortfolio(this.article.id, this.title, this.content, this.img)
          .then(() => {
            this.$store.dispatch("getPortfolios");
            this.closeDialog();
            this.reset();
            this.triggerParentSnackbar("Portfolio updated");
          });
      } else {
        firestore
          .updatePost(this.article.id, this.title, this.content)
          .then(() => {
            this.$store.dispatch("getPost");
            this.closeDialog();
            this.reset();
            this.triggerParentSnackbar("Post updated");
          });
      }
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked() {
      const formData = new FormData();
      const file = this.$refs.image.files[0];
      formData.append("image", file, file.name);
      axios
        .post("https://api.imgur.com/3/image/", formData, {
          headers: {
            Authorization: "Client-ID 5d0f43f26473d77"
          }
        })
        .then(res => (this.img = res.data.data.link));
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.img-select-box {
  .img-preview {
    height: 120px;
    width: 180px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
    .choose-img-prompt {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: radial-gradient(
        ellipse at center,
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.2)
      );
      transition: all 0.5s;
      opacity: 0;
      cursor: pointer;
      i {
        @include centerItem;
        color: white;
        font-size: 3em;
      }
    }
    &:hover > .choose-img-prompt {
      opacity: 1;
    }
  }
  .img-picker {
    display: none;
  }
}
</style>
