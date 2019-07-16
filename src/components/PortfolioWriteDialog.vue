<template>
  <div class="dialog-outer">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="titleInput" label="Title" required :rules="titleRules"></v-text-field>
      <v-textarea
        v-model="contentInput"
        label="Content"
        required
        :rules="contentRules"
        rows="10"
        auto-grow
      ></v-textarea>

      <!-- <v-text-field v-model="img" label="Image URL" required></v-text-field> -->
      <div class="img-select-box">
        <div class="img-preview">
          <img
            :src="imgInput"
            @change="onFilePicked"
            alt = "Current Portfolio Image"
          />
          <div class="choose-img-prompt" @click="pickFile"  title="Change Image">
            <i class="material-icons">image_search</i>
          </div>
        </div>
        <div class="img-picker">
          <!-- <v-icon @click="pickFile" @change="onFilePicked">attach_file</v-icon> -->
          <v-text-field
            label="Select Image"
            @click="pickFile"
            v-model="imgInput"
          ></v-text-field>
          <input
            type="file"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
        </div>
      </div>

      <div class="btn-box">
        <button @click.prevent="reset" class="btn reset-btn">Reset</button>
        <button
          v-if="!!!portfolio.id"
          @click.prevent="create"
          class="btn create-btn"
          :disabled="!valid"
        >Create</button>
        <button v-else @click.prevent="update" class="btn create-btn" :disabled="!valid">Update</button>
      </div>
    </v-form>
    <div class="cancel-btn" @click="closeDialog">
      <i class="material-icons">close</i>
    </div>
  </div>
</template>


<script>
import firestore from "../firebase/firestore";
import axios from "axios";

export default {
  name: "PortfolioWriteDialog",
  props: {
    portfolio: { type: Object },
    dialogWrite: { type: Boolean, default: true }
  },
  watch: {
    portfolio: function() {
      this.titleInput = this.portfolio.title;
      this.contentInput = this.portfolio.content;
      this.imgInput = this.portfolio.img;
      if (!!!this.portfolio.id) {
        this.$refs.form.resetValidation();
      }
    }
  },
  data() {
    return {
      valid: true,
      titleRules: [v => !!v || "Title is required"],
      contentRules: [v => !!v || "Content is required"],
      titleInput: "",
      contentInput: "",
      imgInput: ""
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
      this.imgInput =
        "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg";
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
      firestore
        .postPortfolio(this.titleInput, this.contentInput, this.imgInput)
        .then(() => {
          this.$emit("child_updatePortfolio");
          this.reset();
          this.closeDialog();
          this.triggerParentSnackbar("Portfolio created");
        });
    },
    update() {
      firestore
        .updatePortfolio(
          this.portfolio.id,
          this.titleInput,
          this.contentInput,
          this.imgInput
        )
        .then(() => {
          this.$emit("child_updatePortfolio");
          this.closeDialog();
          this.reset();
          this.triggerParentSnackbar("Portfolio updated");
        });
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
        .then(res => (this.imgInput = res.data.data.link));
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.dialog-outer {
  width: 100%;
  height: 80vh;
  background: white;
  padding: 30px;
  overflow: auto;
  position: relative;
}

.img-select-box {
  .img-preview {
    height: 120px;
    width: 180px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    img {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      cursor: pointer
    }
    .choose-img-prompt {
      width: 100%; height: 100%;
      position: absolute;
      top: 0; left: 0;
      background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2));
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


.btn-box {
  height: 50px;
  margin-top: 20px;
  padding: 0 10px;
  .btn {
    @include nudge-btn;
  }
  .reset-btn {
    @include nudge-btn-gray;
    float: left;
  }
  .create-btn {
    @include nudge-btn-primary;
    float: right;
  }
}


</style>
