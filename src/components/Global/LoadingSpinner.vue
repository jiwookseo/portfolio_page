<template>
  <div class="loader-container">
    <div class="loader"></div>
    <p>{{message}}</p>
  </div>
</template>


<script>
export default {
  name: "LoadingSpinner",
  props: {
    message: { type: String }
  },
  methods: {}
};
</script>

<style lang="scss">
@import "@/css/style.scss";

.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  text-align: center;
  background-color: $nav-bg;
  overflow: hidden;
  opacity: 0.9;
  transition: all 0.2s ease;
  z-index: 250;
}

.loader-container p {
  color: #fff;
  position: absolute;
  font-size: 20px;
  width: 100%;
  height: 25px;
  text-align: center;
  bottom: 0px;
  margin: 0;
  top: calc(50vh + 35px);
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.loader:before {
  content: "";
  position: absolute;
  top: 0px;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  -webkit-animation: loaderg 3s ease-in-out infinite;
  animation: loaderg 3s ease-in-out infinite;
}

.loader {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  background-color: #fff;
}

.loader:after {
  content: "";
  position: absolute;
  top: 0px;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  -webkit-animation: loaderd 3s ease-in-out infinite;
  animation: loaderd 3s ease-in-out infinite;
}

@-webkit-keyframes loaderg {
  0% {
    left: -45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  50% {
    left: 0px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  100% {
    left: -45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
@keyframes loaderg {
  0% {
    left: -45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  50% {
    left: 0px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  100% {
    left: -45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}

@-webkit-keyframes loaderd {
  0% {
    left: 45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  50% {
    left: 0px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  100% {
    left: 45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
@keyframes loaderd {
  0% {
    left: 45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  50% {
    left: 0px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  100% {
    left: 45px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>

