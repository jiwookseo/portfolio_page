<template>
  <div>
    <v-snackbar v-model="askSnackbar.ask" top :timeout="0" color="#FF5E61" class="snackbar-del">
      <div class="snackbar-content">
        {{askSnackbar.message}}
        <button @click="confirm" class="del-btn">{{askSnackbar.button}}</button>
        <button @click="cancel">Cancel</button>
      </div>
    </v-snackbar>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "AskSnackbar",
  computed: mapGetters(["askSnackbar"]),
  methods: {
    confirm() {
      this.$store.dispatch("setAskSnackbar", {
        ask: false,
        confirm: this.askSnackbar.type
      });
    },
    cancel() {
      this.$store.dispatch("setAskSnackbar", { ask: false });
    }
  }
};
</script>

<style lang="scss">
@import "@/css/style.scss";
</style>

