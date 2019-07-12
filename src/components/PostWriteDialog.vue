<template>
    <div class="dialog-outer">
        <div>New Post</div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" label="Title" required :rules="titleRules"></v-text-field>
            <v-text-field v-model="content" label="Content" required :rules="contentRules"></v-text-field>
            <div>
                <v-btn color="warning" @click="clear" class="text">Clear</v-btn>
                <v-btn color="primary" @click="create" class="text" :disabled="!valid">Create</v-btn>
            </div>
        </v-form>
    </div>
</template>


<script>
import firestore from '../firebase/firestore';

export default {
    name: "PostWriteDialog",
    data() {
        return {
            dialogWrite: false,
            valid: true,
            title: '',
            titleRules: [
                (v) => !!v || 'Title is required',
            ],
            content: '',
            contentRules: [
                (v) => !!v || 'Content is required',
            ]
        }
    },
    methods: {
        clear() {
            this.title = '';
            this.content = '';
            this.valid = true;
        },
        closeDialog() {
            this.$emit("child", this.dialogWrite);
        },
        create() {
            firestore.postPost(this.title, this.content);
            alert("Post created");
            this.clear();
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
  height: auto;
  background: white;
  padding: 20px;
}

</style>
