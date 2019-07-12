<template>
    <div class="dialog-outer">
        <h3>{{currTitle}}</h3>
        <p>{{currContent}}</p>
        <p>{{currImg}}</p>
    </div>
</template>

<script>
export default {
    name: "PortfolioDetailDialog",
    data() {
        return {

        }
    },
    props: {
        currTitle: {type: String},
        currContent: {type: String},
        currImg: {type: String},
    }
}
</script>



<style lang="scss" scoped>
@import "../css/style.scss";
@import "../css/mixin.scss";

.dialog-outer {
  width: 100%;
  height: 70vh;
  background: white;
  padding: 20px;
  overflow: auto;
}

</style>
