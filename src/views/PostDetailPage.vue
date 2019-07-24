<template>
  <div>
    {{post}}
  </div>
</template>

<script>
import firestore from "../firebase/firestore";
export default {
  data() {
    return {
      post: {}
    }
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      firestore.getPost(this.$route.params.id).then(res => this.post = res);
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
