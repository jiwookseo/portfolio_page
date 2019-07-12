<template>
<div class="text-xs-center">
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="blue lighten-1" dark v-on="on">
        게시물 작성
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        게시물 작성
      </v-card-title>

      <v-divider></v-divider>

      <v-form v-model="valid">
        <v-container>
          <v-text-field label="Title" v-model="title" :rules="titleRules" required name="title"></v-text-field>
          <v-text-field label="Body" v-model="content" required name="content"></v-text-field>
          <div style="text-align: center;">
            <v-btn @click="submit" :disabled="!valid">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
            <v-btn @click="close">close</v-btn>
          </div>
      </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</div>
</template>


<script>
import firestore from '../firebase/firestore';

export default {
  name: 'contact',
  data() {
    return {
      dialog: false,
      valid: false,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
      ],
      content: ''
    }
  },
  methods: {
    submit() {
      let title = this.title
      let content = this.content
      firestore.postPost(title, content)
      this.dialog = false;
    },
    clear() {
      this.title = '',
      this.content = ''
    },
    close() {
      this.title = '',
      this.content = '',
      this.dialog = false;
    }
  }
}
</script>
