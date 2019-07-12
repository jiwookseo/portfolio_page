<template>
    <div class="dialog-outer">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" label="Title" required :rules="titleRules"></v-text-field>
            <v-text-field v-model="content" label="Content" required :rules="contentRules"></v-text-field>
            <v-text-field v-model="img" label="Image URL" required></v-text-field>
            <div>
                <v-btn color="warning" @click="clear" class="text">Clear</v-btn>
                <v-btn v-if="createMode" color="primary" @click="create" class="text" :disabled="!valid">Create</v-btn>
                <v-btn v-if="!createMode" color="primary" @click="update" class="text" :disabled="!valid">Update</v-btn>
                <v-btn @click="closeDialog" class="text">Cancel</v-btn>
            </div>
        </v-form>
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
        createMode: {type: Boolean}
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
        clear() {
            this.title = '';
            this.content = '';
            this.img = '';
            this.$refs.form.reset();
        },
        closeDialog() {
            this.$emit("child", this.dialogWrite);
        },
        create() {
            firestore.postPortfolio(this.title, this.content, this.img);
            alert("Portfolio created");
            this.clear();
            this.closeDialog();
        },
        update() {
            firestore.updatePortfolio(this.id, this.title, this.content, this.img);
            alert("Portfolio updated");
            this.closeDialog();
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
  padding: 20px;
  overflow: auto;
}

</style>
