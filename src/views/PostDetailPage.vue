<template>
  <div>
    <div class="btn-box">
      <router-link to="/">
        <div class="load-more-btn">Home</div>
      </router-link>
    </div>
    <div class="btn-box">
      <router-link to="/post">
        <div class="load-more-btn">Posts</div>
      </router-link>
    </div>
    <div class="post-content">
      <h3 class="Title">{{post.title || ""}}</h3>
      <p class="Date">{{date_created(post.created_at.seconds)}}</p>
      <p class="Content">{{post.content}}</p>
    </div>
    <div id="disqus_thread" class="px-4"></div>
    <Footer />
  </div>
</template>

<script>
import firestore from "../firebase/firestore";
import Footer from "../components/Footer";

export default {
  components: {
    Footer
  },
  data() {
    return {
    };
  },
  computed: {
    post() {
      return this.$store.getters.getPost(this.$route.params.id);
    }
  },
  mounted() {
    this.$store.dispatch("getPosts");
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
    date_created(created_at) {
      if (created_at === 0) {
        return ""
      }
      else {
        const date = new Date(created_at * 1000);
        return String(date).split("GMT")[0];
      }
    },
  }
};
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
a, a:hover {
  color: initial;
  width: 0; height: 0;
}
.btn-box {
  height: 50px;
  position: relative;
  margin-top: 10px;
}
.load-more-btn {
  position: absolute;
}

.post-content {
  width: 60%;
  margin: 50px auto;
  padding: 10px;
  @include viewportMax(800) {
    width: 80%;
  }
  @include mobile {
    width: 100%;
  }
}
.Title {
  font-size: 2em;
  margin-bottom: 20px;
  @include mobile {
    font-size: 1.7em;
  }
}
.Date {
  color: $gray;
  margin-bottom: 10px;
}
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
  word-break: break-word;
}

#disqus_thread {
  margin-bottom: 50px;
}

</style>
