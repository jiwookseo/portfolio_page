<template>
  <div @click="bookmark" @mouseover="favHover = true" @mouseleave="favHover = false" title="Bookmark this page">
    <i class="material-icons" v-if="!favHover">bookmark_border</i>
    <i class="material-icons" v-if="favHover">bookmark</i>
  </div>
</template>

<script>
export default {
  name: "FavBtn",
  data() {
      return {
          favHover: false,
      }
  },
  methods: {
    bookmark: function(a) {
      const pageTitle = document.title;
      const pageURL = document.location;
      try {
        // Internet Explorer solution
        eval("window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g,''));
      }
      catch (e) {
        try {
          // Mozilla Firefox solution
          window.sidebar.addPanel(pageTitle, pageURL, "");
        }
        catch (e) {
          // Opera solution
          if (typeof(opera)=="object") {
            a.rel="sidebar";
            a.title=pageTitle;
            a.url=pageURL;
            return true;
          } else {
            // The rest browsers (i.e Chrome, Safari)
            alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
          }
        }
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/style.scss';

div {
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
  z-index: 10;
  color: white;
  i {
    @include centerItem;
  }
}
</style>
