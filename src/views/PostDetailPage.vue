<template>
  <div>
    {{post}}
    <div id="disqus_thread" class="px-4"></div>
  </div>
</template>

<script>
import firestore from "../firebase/firestore";
export default {
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    this.getPost();
    var disqus_config = function() {
      this.page.url = "https://ssafy-teamsix.firebaseapp.com/"; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = this.$route.params.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() {
      var d = document,
        s = d.createElement("script");
      s.src = "https://ssafy-teamsix.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
  },
  methods: {
    getPost() {
      firestore.getPost(this.$route.params.id).then(res => (this.post = res));
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
