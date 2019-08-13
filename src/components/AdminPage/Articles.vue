<template>
  <v-container class="vContainer">
    <h2 class="section-subtitle">Articles</h2>
    <section class="articles">
      <div class="portfolios">
        <h4>Portfolios ({{portfolios.length}})</h4>
        <ul>
          <li v-for="p in portfolios" :key="p.id"><router-link :to="{name: 'PortfolioDetailPage', params: {id: p.id}}">{{p.title}}</router-link></li>
        </ul>
      </div>
      <div class="posts">
        <h4>Posts ({{posts.length}})</h4>
        <ul>
          <li v-for="p in posts" :key="p.id"><router-link :to="{name: 'PostDetailPage', params: {id: p.id}}">{{p.title}}</router-link></li>
        </ul>
      </div>
    </section>
    <hr />
    <div class="dummy-box">
      <h5>*Dummy Generator</h5>
      <p>Add dummy data content into <pre class="code">src/firebase/dummy.json</pre> and click Generate.</p>
      <p>Data must have the following format:</p>
      <p>
        <pre>{
  "type": "posts",
  "article": {
    "title": "",
    "content": "",
    "userID": "",
    "userName": "",
    "userEmail": ""
  }
}
{
  "type": "portfolios",
  "article": {
    "title": "",
    "content": "",
    "img": "",
    "userID": "",
    "userName": "",
    "userEmail": ""
  }
}
</pre>
      </p>
      <div class="generate-btn" @click="postDummy">Generate</div>
    </div>
  </v-container>
</template>


<script>
import dummy from "@/firebase/dummy";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["portfolios", "posts"]),
  },
  methods: {
    postDummy() {
      dummy.postDummy();
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/css/style.scss";

section.articles {
  margin-bottom: 20px;
  .portfolios, .posts {
    display: inline-block;
    vertical-align: top;
    width: 49%;
    padding: 0 15px;
    @include mobile {
      width: 100%;
    }
    height: auto;
    ul {
      margin: 0; padding: 0;
      li {
        margin: 10px 0;
        text-align: justify;
      }
    }
  }
}


.dummy-box {
  margin-top: 20px;
  height: auto;
  h5 {
    font-size: 1em;
  }
  p {padding: 0; margin: 0;}
  .code {
    color: $gray;
    background: lightgoldenrodyellow;
    display: inline-block;
  }
  .generate-btn {
    @include nudge-btn;
    @include nudge-btn-primary;
    cursor: pointer;
    margin: 10px 0;
  }
}
</style>
