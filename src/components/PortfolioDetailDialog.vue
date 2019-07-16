<template>
  <div class="dialog-outer">
    <h3 class="Title">{{portfolio.title}}</h3>
    <p class="Date">{{date_created}}</p>
    <!-- <div class="Img" :style="{'background-image': 'url(' + img + ')'}"></div> -->
    <img :src="portfolio.img" class="Img" :alt="portfolio.title + ' (portfolio image)'" />
    <p class="Content">{{portfolio.content}}</p>
    <div class="cancel-btn" @click="closeDialog">
      <i class="material-icons">close</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PortfolioDetailDialog",
  data() {
    return {
      date: ""
    };
  },
  props: {
    portfolio: { type: Object }
  },
  computed: {
    date_created() {
      const date = new Date(this.portfolio.created_at.seconds * 1000);
      return String(date).split("GMT")[0];
    }
  },
  methods: {
    closeDialog() {
      this.$emit("child_detail");
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.dialog-outer {
  width: 100%;
  height: 80vh;
  background: white;
  padding: 30px;
  overflow: auto;
  position: relative;
}
.Title {
  font-size: 2em;
  margin-bottom: 20px;
}
.Date {
  color: $gray;
  margin-bottom: 10px;
}
.Img {
  width: 100%;
  height: 250px;
  @include mobile {
    height: 200px;
  }
  border-radius: 3px;
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  object-fit: cover;
}
.Content {
  margin-top: 10px;
  line-height: 1.7em;
  white-space: pre-wrap;
}
</style>
