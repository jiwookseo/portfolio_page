<template>
  <v-app id="app">
    <v-content>
      <router-view />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>


<style lang="scss" scoped>
@import './css/reset.css';
@import './css/style.css';
</style>

<style lang="scss">
body {
  overflow-y: overlay;
  overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 8px;
}
body::-webkit-scrollbar-track {
  background-color: transparent;
  border: 0;
}
body::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>

