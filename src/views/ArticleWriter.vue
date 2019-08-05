<template>
  <div class="article-writer">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="scrollable-content">
        <v-text-field v-model="data.title" label="Title" required :rules="titleRules"></v-text-field>
        <v-textarea
          v-model="data.content"
          label="Content"
          required
          :rules="contentRules"
          rows="10"
          auto-grow
        ></v-textarea>
        <div v-if="isPortfolio" class="img-select-box">
          <div class="img-preview">
            <img :src="data.img" @change="onFilePicked" alt="Current Portfolio Image" />
            <div class="choose-img-prompt" @click="pickFile" title="Change Image">
              <i class="material-icons">image_search</i>
            </div>
          </div>
          <div class="img-picker">
            <v-text-field label="Select Image" @click="pickFile" v-model="data.img"></v-text-field>
            <input type="file" ref="image" accept="image/*" @change="onFilePicked" />
          </div>
        </div>
      </div>
      <div class="btn-box-bottom">
        <button @click.prevent="reset" class="btn reset-btn">Reset</button>
        <button
          v-if="isNewArticle"
          @click.prevent="create"
          class="btn create-btn"
          :disabled="!valid"
        >Create</button>
        <button 
          v-else 
          @click.prevent="update" 
          class="btn create-btn" 
          :disabled="!valid"
        >Update</button>
      </div>
    </v-form>
  </div>
</template>



<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ArticleWriter",
  data() {
    return {
      valid: true,
      titleRules: [v => !!v || "Title is required"],
      contentRules: [v => !!v || "Content is required"],
      data: {}
    }
  },
  computed: {
    ...mapGetters(["askSnackbar", "user"]),
    isPortfolio() {
      return this.$route.fullPath[3] === "r";
    },
    isNewArticle() { // as opposed to "Edit Article"
      return this.$route.fullPath.slice(-4,) === "/new"
    },
    buttonName() {
      return this.isPortfolio ? "Portfolio" : "Post";
    },
    type() {
      return this.isPortfolio ? "portfolio" : "post";
    },
    article() {
      return this.$store.getters.getArticle(this.type, this.$route.params.id);
    },
  },
  methods: {
    setData() {
      if (this.isNewArticle) {
        this.data.title = "";
        this.data.content = "";
        this.data.img = "http://anzancity.ir/uploads/posts/village-warning.jpg";
      }
      else {
        this.data = Object.assign(this.data, this.article);
      }
    },
    reset() {
      this.$refs.form.reset();
      if (this.isPortfolio)
        this.data.img = "http://anzancity.ir/uploads/posts/village-warning.jpg";
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    create() {
      if (this.$refs.form.validate()) {
        const type = this.isPortfolio ? "portfolios" : "posts";
        firestore.postArticle(type, this.user, this.data).then(() => {
          this.$store.dispatch("getArticles", type);
        });
        this.reset();
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: this.isPortfolio ? "Portfolio created" : "Post created"
        })
      }
    },
    update() {
      const type = this.isPortfolio ? "portfolios" : "posts";
      firestore.updateArticle(type, this.article.id, this.data).then(() => {
        this.$store.dispatch("getArticles", type);
      });
      this.reset();
      this.$store.dispatch("setAlertSnackbar", {
        alert: true,
        message: this.isPortfolio ? "Portfolio updated" : "Post updated"
      })
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked() {
      const formData = new FormData();
      const file = this.$refs.image.files[0];
      formData.append("image", file, file.name);
      this.$store.dispatch("setSpinner", {
        loading: true,
        message: "Uploading..."
      });
      axios
        .post("https://api.imgur.com/3/image/", formData, {
          headers: {
            Authorization: "Client-ID 5d0f43f26473d77"
          }
        })
        .then(res => {
          this.data.img = res.data.data.link;
          this.$store.dispatch("setSpinner", { loading: false });
        });
    }
  },
  created() {
    this.setData();
  },
  mounted() {
    this.setData();
    console.log(this.$route.params.id);
  },
}
</script>


<style lang="scss" scoped>
@import "@/css/mixin.scss";
@import "@/css/style.scss";

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
