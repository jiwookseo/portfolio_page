<template>
  <div class="dialog-outer">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="title" label="Title" required :rules="titleRules"></v-text-field>
      <v-textarea v-model="content" label="Content" required :rules="contentRules" rows=10 auto-grow></v-textarea>
      <v-text-field v-model="img" label="Image URL" required></v-text-field>
      <div class="btn-box">
        <button @click.prevent="reset" class="btn reset-btn">Reset</button>
        <button v-if="createMode" @click.prevent="create" class="btn create-btn" :disabled="!valid">Create</button>
        <button v-if="!createMode" @click.prevent="update" class="btn create-btn" :disabled="!valid">Update</button>
      </div>
      
      <!-- <div>
        <v-btn color="warning"  class="text">Reset</v-btn>
        <v-btn color="primary" @click="create" class="text" :disabled="!valid">Create</v-btn>
        <v-btn v-if="!createMode" color="primary" @click="update" class="text" :disabled="!valid">Update</v-btn>
      </div> -->
    </v-form>
    <div class="cancel-btn" @click="closeDialog">
      <i class="material-icons">close</i>
    </div>
  </div>
</template>


<script>
import firestore from '../firebase/firestore';

export default {
    name: "PortfolioWriteDialog",
    props: {
      id: {type: String},
      title: {type: String},
      content: {type: String},
      img: {type: String},
      createMode: {type: Boolean, default: true}
    },
    data() {
      return {
        dialogWrite: false,
        valid: true,
        titleRules: [
            (v) => !!v || 'Title is required',
        ],
        contentRules: [
            (v) => !!v || 'Content is required',
        ],
      }
    },
    methods: {
      reset() {
        this.$refs.form.reset();
      },
      closeDialog() {
        this.reset();
        this.$emit("child", this.dialogWrite);
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
        await firestore.updatePortfolio(this.id, this.title, this.content, this.img);
        await this.$emit("child_updatePortfolio");
        this.closeDialog();
        this.reset();
        this.triggerParentSnackbar("Portfolio updated");
      }
    }
    
}
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.dialog-outer {
  width: 100%;
  height: 70vh;
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
  top: 10px; right: 10px;
  width: 40px; height: 40px;
  cursor: pointer;
  i {
    color: gray;
    @include centerItem;
    font-size: 2.5em;
  }
}

</style>
