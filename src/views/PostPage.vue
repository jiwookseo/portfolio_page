<template>
<div>
  <HeaderSub />
  <div class="content">
    <h2>Post</h2>
  </div>
  <v-container>

    <!-- Post -->
    <PostWriter />
    <v-layout>
      <v-flex xs12>
        <PostList :limits="6" :load-more="true"></PostList>
      </v-flex>
    </v-layout>

  </v-container>
</div>
</template>


<script>
import HeaderSub from '../components/HeaderSub';
import PostList from '../components/PostList'
import PostWriter from '../components/PostWriter'

export default {
  name: "PostPage",
  components: {
    HeaderSub,
    PostList,
    PostWriter
  }
}
</script>


<style lang="scss" scoped>
.content {
    margin-top: 50px;
    padding-top: 10px;
    height: 2000px;
    h2 {
        text-align: center;
        font-size: 2em;
    }
}
</style>
