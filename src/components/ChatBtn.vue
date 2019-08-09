<template>
  <div>
    <div class="chat-btn" @click="chat = !chat">
      <i class="material-icons">chat</i>
    </div>
    <div v-show="chat">
      <iframe class="chatBox" allow="microphone;" width="350" height="430" src="https://console.dialogflow.com/api-client/demo/embedded/10acde14-fbcc-4dd7-b815-a789f1727841">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBtn",
  components: {},
  data() {
    return {
      chat : false,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/style.scss";

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
.chatBox {
  position: fixed;
  bottom: 20px;
  right: 85px;
  z-index: 15;
}
</style>