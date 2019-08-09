<template>
  <div>
    <v-snackbar
      v-model="alertSnackbar.alert"
      top
      :timeout="4000"
      color="#FF5E61"
      class="snackbar-alert"
    >
      <div class="snackbar-content">
        {{alertSnackbar.message}}
        <button @click="close" class="ok-btn">OK</button>
      </div>
    </v-snackbar>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "AlertSnackbar",
  computed: mapGetters(["alertSnackbar"]),
  methods: {
    close() {
      this.$store.dispatch("setAlertSnackbar", { alert: false });
    }
  }
};
</script>

<style lang="scss">
@import "@/css/style.scss";
</style>

