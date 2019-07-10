<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Portfolio 쓰기</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <img id="image" src="http://dy.gnch.or.kr/img/no-image.jpg" height="150px" width="100px">
              <br>
              <input id="file" type="file">
              제목 : <v-text-field label="" required></v-text-field>
            </v-flex>
            <v-container fluid grid-list-md>
              <v-textarea name="input-7-1" box label="내용" value="" height="200px" box no-resize></v-textarea>



            </v-container>

          </v-layout>
        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>
