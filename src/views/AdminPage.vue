<template>
  <div class="wrap">
    <div class="btn-box">
      <router-link to="/">
        <button title="Back to HomePage"><i class="material-icons">arrow_back</i></button>
      </router-link>
    </div>
    <h2 class="section-title">Admin Page</h2>
    <div class="content-container">

    </div>
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/style.scss";

a, a:hover {
  color: initial;
  text-decoration: none;
}

.btn-box {
  height: 50px;
  button {
    height: 100%;
    width: 50px;
    position: relative;
    background: rgba(0, 0, 0, 0.05);
    &:focus {
      outline: none;
    }
    i {
      @include centerItem;
      font-size: 2em;
    }
  }
}

</style>
