<template>
<div>
  <HeaderSub />
  <div class="content">
    <h2 class="section-title text">Post</h2>
		<PostList :limit=6 :allowCreate=true />
  </div>
  <Footer />
</div>
</template>


<script>
import firestore from "../firebase/firestore";
import HeaderSub from '../components/HeaderSub';
import PostList from '../components/PostList'
import Footer from "../components/Footer";

export default {
  name: "PostPage",
  components: {
    HeaderSub,
    PostList,
    Footer
	},
	data() {
		return {

		}
  },
  mounted() {
    this.addLog();
    this.$store.dispatch("getPosts");
  },
  methods: {
    addLog() {
      let username = '';
      if (!this.$store.getters.user) {
        username = "Anonymous User";
      }
      else {
        username = this.$store.getters.user.email;
      }
      let time = new Date();
      firestore.addLog("/post", username, time.getDay());
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.content {
	margin: 80px 0 50px;
  height: auto;
  min-height: 100vh;
}
</style>
