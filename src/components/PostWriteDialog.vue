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
      <div class="btn-box">
        <button @click.prevent="reset" class="btn reset-btn">Reset</button>
        <button
          v-if="!!!post.id"
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

export default {
  name: "PostWriteDialog",
  props: {
    post: { type: Object },
    dialogWrite: { type: Boolean, default: true }
  },
  watch: {
    post: function() {
      this.titleInput = this.post.title;
      this.contentInput = this.post.content;
      if (!!!this.post.id) {
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
      contentInput: ""
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
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
      console.log(this.titleInput, this.contentInput);
      const res = await firestore.postPost(this.titleInput, this.contentInput);
      this.$emit("child_updatePost");
      this.reset();
      this.closeDialog();
      this.triggerParentSnackbar("Post created");
    },
    update() {
      firestore
        .updatePost(this.post.id, this.titleInput, this.contentInput)
        .then(() => {
          this.$emit("child_updatePost");
          this.closeDialog();
          this.reset();
          this.triggerParentSnackbar("Post updated");
        });
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

.cancel-btn {
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
</style>
