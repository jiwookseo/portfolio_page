<template>
    <div class="dialog-outer">
        <h3>{{title}}</h3>
        <p>{{content}}</p>
        <p>{{img}}</p>
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
        title: {type: String},
        content: {type: String},
        img: {type: String},
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
