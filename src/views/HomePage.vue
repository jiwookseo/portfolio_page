<template>
  <div id="wrap">
    <HeaderHome />
    <div class="homeContent">
      <section id="aboutme">

      </section>
      <section id="portfolio">

      </section>
      <section id="post">

      </section>
      <section id="project">

      </section>
    </div>
  </div>
</template>

<script>

import HeaderHome from '../components/HeaderHome';

  export default {
    name: "HomePage",
    components: {
      HeaderHome
    },
    methods: {
      scrollTo(target) {
        let targetscrolltop = $(target).offset().top;
        $('html, body').animate({
          scrollTop: targetscrolltop
        }, 500);
      }
    }
  }
</script>

<style lang="scss" scoped>
#wrap {
  width: 100%;
}
.homeContent {
  width: 100%;
}
section {
  width: 100%;
  height: 500px;
  position: relative;
  &:nth-of-type(odd) {
    background: white;
  }
  &:nth-of-type(even) {
    background: #EEEEEE;
  }
}
</style>
