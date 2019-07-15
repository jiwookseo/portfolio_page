<template>
  <div class="imgBannerOuter" :style="{ 'background-image': 'url(' + imgSrc + ')'}">
    <div class="imgBannerContent">
      <div class="changeBg"><i class="material-icons">photo_library</i></div>
      <div class="bannerTitle">Team Six !!!!!</div>
      <div class="scrollPrompt" @click="scrollTo()">
        SCROLL DOWN
        <i class="material-icons">arrow_drop_down</i>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ImgBanner",
  props: {
    imgSrc: { type: String }
  },
  methods: {
    scrollTo() {
      this.$parent.scrollTo("#aboutme");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";
.imgBannerOuter {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  .imgBannerContent {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(0, 0, 0, 0.2);
    .changeBg {
      position: absolute;
      bottom: 20px; left: 20px;
      width: 50px; height: 50px;
      border-radius: 50%;
      color: white;
      border: 2px solid white;
      opacity: 0.1;
      transition: all 0.3s;
      cursor: pointer;
      i {
        @include centerItem;
      }
      &:hover {opacity: 0.5;}
    }
    .bannerTitle {
      text-align: center;
      font-family: $font-title;
      font-size: 5em;
      color: white;
      text-shadow: 1px 1px 0px #181818, 2px 2px 5px white, -2px -2px 5px white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .scrollPrompt {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translate(-50%);
      padding: 5px 20px 12px 25px;
      color: white;
      border: 1.5px solid white;
      cursor: pointer;
      transition: all 0.3s;
      background-color: rgba(0, 0, 0, 0.3);
      white-space: nowrap;
      i {
        transform: translateY(7px);
      }
      &::before, &::after {
        content: '';
        width: 95%;
        height: 135%;
        border: 0px solid white;
        transition: all 0.3s;
        @include centerItem;
      }
      &::before {
        border-top-width: 1.5px;
        border-bottom-width: 1.5px;
        transform: translate(-50%, -50%) scaleX(0);
        transform-origin: left;
      }
      &::after {
        border-left-width: 1.5px;
        border-right-width: 1.5px;
        transform: translate(-50%, -50%) scaleY(0);
        transform-origin: top;
      }
      &:hover::before {
        transform: translate(-50%, -50%) scaleX(1);
      }
      &:hover::after {
        transform: translate(-50%, -50%) scaleY(1);
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>

