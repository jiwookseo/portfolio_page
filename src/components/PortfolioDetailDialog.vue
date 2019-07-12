<template>
    <div class="dialog-outer">
        <h3>{{title}}</h3>
        <p>{{date_created}}</p>
        <p>{{content}}</p>
        <p>{{img}}</p>
    </div>
</template>

<script>
export default {
    name: "PortfolioDetailDialog",
    data() {
        return {
            date: ''
        }
    },
    props: {
        title: {type: String},
        content: {type: String},
        img: {type: String},
        created_at: {type: Number}
    },
    computed: {
        date_created() {
            const date = new Date(this.created_at * 1000);
            return date
        }
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
