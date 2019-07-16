<template>
<div class="dialog-outer">
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="title" label="Title" required :rules="titleRules"></v-text-field>
    <v-textarea v-model="content" label="Content" required :rules="contentRules" rows="10" auto-grow></v-textarea>

    <!-- <v-text-field v-model="img" label="Image URL" required></v-text-field> -->
    <div>
      <div style="margin:auto; text-align:center;">
        <img id="img-preview" :src="img" @click="pickFile" @change="onFilePicked" style="cursor:wait" width="180px" height="120px" />
      </div>
      <div>
        <!-- <v-icon @click="pickFile" @change="onFilePicked">attach_file</v-icon> -->
        <v-text-field label="Select Image" @click="pickFile" style="display: none" v-model="img"></v-text-field>
        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
      </div>
    </div>

    <div class="btn-box">
      <button @click.prevent="reset" class="btn reset-btn">Reset</button>
      <button v-if="createMode" @click.prevent="create" class="btn create-btn" :disabled="!valid">Create</button>
      <button v-if="!createMode" @click.prevent="update" class="btn create-btn" :disabled="!valid">Update</button>
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
    id: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    img: {
      type: String
    },
    createMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      valid: true,
      titleRules: [v => !!v || "Title is required"],
      contentRules: [v => !!v || "Content is required"]
    };
  },
  watch: {
    createMode: function() {
      this.resetValidation();
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
      this.img ="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg";
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
    async create() {
      await firestore.postPortfolio(this.title, this.content, this.img);
      await this.$emit("child_updatePortfolio");
      this.reset();
      this.closeDialog();
      this.triggerParentSnackbar("Portfolio created");
    },
    async update() {
      await firestore.updatePortfolio(
        this.id,
        this.title,
        this.content,
        this.img
      );
      await this.$emit("child_updatePortfolio");
      this.closeDialog();
      this.reset();
      this.triggerParentSnackbar("Portfolio updated");
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

.dialog-outer {
    width: 100%;
    height: 80vh;
    background: white;
    padding: 30px;
    overflow: auto;
    position: relative;
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
