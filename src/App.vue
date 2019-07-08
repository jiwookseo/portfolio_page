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
