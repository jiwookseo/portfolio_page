<template>
  <div>
    {{portfolio}}
  </div>
</template>

<script>
import firestore from "../firebase/firestore";
export default {
  data() {
    return {
      portfolio: {}
    }
  },
  mounted() {
    this.getPortfolio();
  },
  methods: {
    getPortfolio() {
      firestore.getPortfolio(this.$route.params.id).then(res => this.portfolio = res);
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
