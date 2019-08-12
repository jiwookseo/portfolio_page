<template>
  <v-app id="app">
    <v-content class="content">
      <vue-page-transition>
        <router-view />
      </vue-page-transition>
      <TranslateBtn />
      <ChatBtn />
      <LoadingSpinner v-show="spinner.loading" :message="spinner.message" />
      <AskSnackbar />
      <AlertSnackbar />
      <router-link to="/admin" v-if="isAdmin">
        <div id="toAdmin" title="Admin Page">
          <i class="material-icons">how_to_reg</i>
        </div>
      </router-link>
    </v-content>
  </v-app>
</template>

<script>
import firestore from "@/firebase/firestore";
import ChatBtn from "@/components/ChatBtn";
import TranslateBtn from "@/components/TranslateBtn";
import LoadingSpinner from "@/components/Global/LoadingSpinner";
import AskSnackbar from "@/components/Global/AskSnackbar";
import AlertSnackbar from "@/components/Global/AlertSnackbar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    ChatBtn,
    TranslateBtn,
    LoadingSpinner,
    AskSnackbar,
    AlertSnackbar
  },
  data() {
    return {};
  },
  watch: {
    $route() {
      // route 가 변경될 때에 post / portfolio / home page 를 구분하여 data reload
      const path = this.$route.matched[0].path;
      if (path === "") {
        this.$store.dispatch("getArticles", "posts");
        this.$store.dispatch("getArticles", "portfolios");
      } else {
        if (path.slice(0, 4) === "/pos")
          this.$store.dispatch("getArticles", "posts");
        else this.$store.dispatch("getArticles", "portfolios");
      }
      // route 가 변경될 때에 log 를 생성
      this.addLog(this.$route.path);
    }
  },
  computed: {
    ...mapGetters(["spinner", "user"]),
    ...mapGetters({ isAdmin: "checkIfAdmin" })
  },
  mounted() {
    // mount cycle 에 최초 데이터 로드
    this.$store.dispatch("getArticles", "posts");
    this.$store.dispatch("getArticles", "portfolios");
    this.$store.dispatch("getUserAll");
  },
  methods: {
    addLog(path) {
      const time = new Date();
      firestore.addLog(
        path,
        this.user ? this.user.email : "Anonymous User",
        time.getDay()
      );
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./css/reset.css";
@import "./css/style.scss";

.content {
  position: relative;
}

#toAdmin {
  width: 50px;
  height: 50px;
  position: fixed;
  border-radius: 50%;
  color: $blue-accent;
  border: 2px solid $blue-accent;
  bottom: 20px;
  left: 20px;
  opacity: 0.1;
  z-index: 15;
  cursor: pointer;
  display: none;
  &:hover {
    opacity: 1;
  }
  i {
    @include centerItem;
  }
}
</style>

<style lang="scss">
@import "./css/style.scss";

body {
  overflow-y: auto;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  display: none;
}
div,
span {
  font-family: $font-content;
}
#line-chart {
  height: 400px !important;
}
</style>
