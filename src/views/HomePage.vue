<template>
  <div id="wrap">
    <HeaderHome :websiteTitle="'HOME'" />
    <div class="homeContent">
      <section id="aboutme">
        <h2 class="section-title text">About me</h2>
      </section>
      <section id="portfolio">
        <h2 class="section-title text">Portfolio</h2>
        <PortfolioList :limit="4"></PortfolioList>
        <div>
          <PortfolioWriteModal />
        </div>

      </section>
      <section id="post">
        <h2 class="section-title text">Post</h2>
        <PostList />
      </section>
      <section id="project">
        <h2 class="section-title text">Project</h2>
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

export default {
  name: "HomePage",
  components: {
    HeaderHome,
    PortfolioList,
    PortfolioWriteModal,
    PostList
  },
  data() {
    return {

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
#wrap {
  width: 100%;
}
.homeContent {
  width: 100%;
}
section {
  width: 100%;
  height: 500px;
  padding-top: 60px;
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
    font-size: 2em;
    font-family: $font-title;
    letter-spacing: 2px;
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

#portfolio {
  height: auto;
}
</style>
