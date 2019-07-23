<template>
  <div>
    <div class="chat-btn">
      <i class="material-icons">chat</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBtn",
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../css/reset.css";
@import "../css/style.scss";
@import "../css/mixin.scss";

@keyframes bobup {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-3px);
  }
}
.chat-btn {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  right: 20px;
  background: $blue-accent;
  z-index: 15;
  cursor: pointer;
  i {
    @include centerItem;
    color: white;
  }
  &:hover {
    animation: bobup 0.5s ease-in-out infinite alternate;
  }
}
.chat-btn {
  bottom: 20px;
}
</style>