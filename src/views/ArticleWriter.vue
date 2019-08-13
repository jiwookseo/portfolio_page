<template>
  <div class="article-writer">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="scrollable-content">
        <v-text-field 
          v-model="title" 
          label="Title" 
          required 
          :rules="titleRules"
          :autofocus="isNewArticle"
        ></v-text-field>
        <v-textarea
          v-model="content"
          label="Content"
          required
          :rules="contentRules"
          rows="10"
          auto-grow
        ></v-textarea>
        <div v-if="isPortfolio" class="img-select-box">
          <div class="options">
            <div 
              class="option"
              :class="{'sel': uploadImgByFile}"
              @click="uploadImgByFile = true"
            >FILE</div>
            <div 
              class="option"
              :class="{'sel': !uploadImgByFile}"
              @click="uploadImgByFile = false"
            >URL</div>
          </div>
          <div class="img-url" v-if="!uploadImgByFile">
            <v-text-field v-model="img" label="Image URL"></v-text-field>
          </div>
          <div class="img-preview" v-if="uploadImgByFile">
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
import firestore from "@/firebase/firestore";

export default {
  name: "ArticleWriter",
  data() {
    return {
      valid: true,
      titleRules: [v => !!v || "Title is required"],
      contentRules: [v => !!v || "Content is required"],
      title: '',
      content: '',
      img: '',
      uploadImgByFile: true
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
    type() {
      return this.isPortfolio ? "portfolio" : "post";
    },
    article() {
      if (this.isNewArticle) {
        return { 
          title: "",
          content: "",
          img: "http://anzancity.ir/uploads/posts/village-warning.jpg",
          created_at: { seconds: 0 } };
      }
      else {
        return this.$store.getters.getArticle(
          this.isPortfolio ? "portfolio" : "post",
          this.$route.params.id
        );
      }
    }
  },
  watch: {
    article() {
      if (!this.isNewArticle) {
        this.setData();
      }
    }
  },
  methods: {
    setData() {
      this.title = this.article.title;
      this.content = this.article.content;
      this.img = this.article.img;
    },
    reset() {
      this.$refs.form.reset();
      if (this.isPortfolio)
        this.img = "http://anzancity.ir/uploads/posts/village-warning.jpg";
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    create() {
      if (this.$refs.form.validate()) {
        const type = this.isPortfolio ? "portfolios" : "posts";
        let d = {
          title: this.title,
          content: this.content,
          img: this.img
        }
        firestore.postArticle(type, this.user, d).then((res) => {
          this.$store.dispatch("getArticles", type);
          if (this.isPortfolio) {
            this.$router.replace({name: 'PortfolioDetailPage', params: {id: res.id}});
          }
          else {
            this.$router.replace({name: 'PostDetailPage', params: {id: res.id}});
          }
        });
        this.$store.dispatch("setAlertSnackbar", {
          alert: true,
          message: this.isPortfolio ? "Portfolio created" : "Post created"
        })
      }
    },
    update() {
      const type = this.isPortfolio ? "portfolios" : "posts";
      let d = {
        title: this.title,
        content: this.content,
        img: this.img
      }
      firestore.updateArticle(type, this.$route.params.id, d).then(() => {
        this.$store.dispatch("getArticles", type);
        if (this.isPortfolio) {
          this.$router.replace({name: 'PortfolioDetailPage', params: {id: this.$route.params.id}});
        }
        else {
          this.$router.replace({name: 'PostDetailPage', params: {id: this.$route.params.id}});
        }
      });
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
          this.img = res.data.data.link;
          this.$store.dispatch("setSpinner", { loading: false });
        });
    }
  },
  created() {
    this.setData();
  },
}
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";

.article-writer {
  margin-top: 12px;
  .btn-box-bottom {
    .btn {
      margin-top: 10px;
      @include nudge-btn;
    }
    .reset-btn {
      @include nudge-btn-gray;
      float: left;
      margin-left: 20px;
    }
    .create-btn {
      @include nudge-btn-primary;
      float: right;
      margin-right: 20px;
    }
  }
}

.img-select-box {
  .options {
    width: 180px;
    height: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .option {
      display: inline-block;
      line-height: 1em;
      cursor: pointer;
      &.sel {
        text-decoration: underline;
        color: $blue-accent;
      }
    }
  }
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
