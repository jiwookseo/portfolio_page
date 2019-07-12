<template>
  <div id="wrap">
    <HeaderHome :websiteTitle="'HOME'" />
    <div class="homeContent">
      <section id="aboutme">
        <h2 class="section-title text">About me</h2>
        <div class="text" style="text-align: center" v-if="user">[테스트문장] {{user.email}}님 반갑습니다</div>
      </section>
      <section id="portfolio">
        <h2 class="section-title text">Portfolio</h2>
        <PortfolioList :limit=4 />
        <div>
          <div class="more"><router-link to="/portfolio"><div>More Portfolios</div></router-link></div>
        </div>
        <div>
          <PortfolioWriteModal />
        </div>

      </section>
      <section id="post">
        <h2 class="section-title text">Post</h2>
        <PostList :limit=4 />
        <div>
          <div class="more"><router-link to="/post"><div>More Posts</div></router-link></div>
        </div>
      </section>
      <section id="project">
        <h2 class="section-title text">Project</h2>
        <line-chart></line-chart>
      </section>
    </div>
  </div>
</template>

<script>
import "../js/navbar.js";
// import firestore from "../firebase/firestore";
import HeaderHome from "../components/HeaderHome";
import PortfolioList from "../components/PortfolioList";
import PortfolioWriteModal from "../components/PortfolioWriteModal";
import PostList from "../components/PostList";
import LineChart from "../components/LineChart";

export default {
  name: "HomePage",
  components: {
    HeaderHome,
    PortfolioList,
    PortfolioWriteModal,
    PostList,
    LineChart
  },
  data() {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    scrollTo(target) {
      let targetscrolltop = $(target).offset().top;
      $("html, body").animate(
        {
          scrollTop: targetscrolltop + 10
        },
        500
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";
a, a:hover {
    color: initial;
}
#wrap {
  width: 100%;
}
.homeContent {
  width: 100%;
}
section {
  width: 100%;
  height: 500px;
  padding-top: 80px;
  position: relative;
  &:nth-of-type(odd) {
    background: white;
  }
  &:nth-of-type(even) {
    background: $bg-light;
  }
  .section-title {
    text-transform: uppercase;
    text-align: center;
    font-size: 3em;
    font-family: $font-title;
    letter-spacing: 4px;
  }
}

$slant_h: 30px;
$slant_m: 20px;
@mixin slanted {
  width: 100%;
  content: "";
  position: absolute;
  left: 0;
  border-style: solid;
  z-index: 8;
  bottom: $slant_h * -1;
}
#aboutme::after,
#post::after {
  @include slanted;
  border-width: 0 100vw $slant_h 0;
  border-color: transparent white transparent transparent;
  @include mobile {
    bottom: $slant_m * -1;
    border-width: 0 100vw $slant_m 0;
  }
}
#portfolio::after {
  @include slanted;
  border-width: 0 0 $slant_h 100vw;
  border-color: transparent transparent transparent $bg-light;
  @include mobile {
    bottom: $slant_m * -1;
    border-width: 0 0 $slant_m 100vw;
  }
}

#portfolio, #post {
  height: auto;
}
.more {
  margin: 30px auto 0;
  width: 140px;
  height: 40px;
  line-height: 37px;
  border-radius: 5px;
  border: 1.5px solid $nav-bg;
  text-align: center;
  transition: all 0.3s;
  background: linear-gradient(to bottom, $nav-bg, $footer-bg);
  div {
    width: 100%; height: 100%;
    color: #181818;
  }
  &:hover {
    background: linear-gradient(to bottom, $nav-bg, $nav-bg);
  }
}
</style>
