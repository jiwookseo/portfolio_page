<template>
  <header>
    <nav class="navbar">
      <div class="nav-item text">
        <router-link to="/">HOME</router-link>
      </div>
      <div class="btn-right">
        <router-link to="/portfolio">
          <div class="nav-item text">Portfolio</div>
        </router-link>
        <router-link to="/post">
          <div class="nav-item text">Post</div>
        </router-link>
        <div v-if="!user" class="nav-item login-btn text" @click.stop="dialog = true">Login</div>
        <div v-if="user" @click="signOut" class="nav-item login-btn text">Logout</div>
      </div>
    </nav>
    <transition name="slide-fade">
      <nav class="sidebar" v-if="showSidebar">
        <router-link to="/">
          <div class="sb-nav-logo text">HOME</div>
        </router-link>
        <ul>
          <router-link to="/portfolio">
            <li class="sb-nav-menu text">Portfolio</li>
          </router-link>
          <router-link to="/post">
            <li class="sb-nav-menu text">Post</li>
          </router-link>
          <li v-if="!user" class="sb-nav-menu text" @click.stop="dialog = true">Login</li>
          <li v-if="user" class="sb-nav-menu text" v-on:click="signOut">Logout</li>
        </ul>
      </nav>
    </transition>
    <div class="menu-btn" @click="showSidebar = !showSidebar">
      <span v-if="showSidebar">
        <i class="material-icons">clear</i>
      </span>
      <span v-if="!showSidebar">
        <i class="material-icons">dehaze</i>
      </span>
    </div>
    <FavBtn class="nav-fav" />
    <v-dialog v-model="dialog" class="login-dialog" width="300">
      <LoginDialog @child="parents" />
    </v-dialog>
  </header>
</template>

<script>
import FavBtn from "./FavBtn";
import LoginDialog from "./LoginDialog";
import { mapActions } from "vuex";

export default {
  name: "HeaderSub",
  components: {
    FavBtn,
    LoginDialog
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  props: {},
  data() {
    return {
      dialog: false,
      showSidebar: false
    };
  },
  methods: {
    ...mapActions(["logout"]),
    signOut() {
      this.logout()
      this.$swal("Goodbye!", "로그아웃 되었습니다", "success")
      console.log(this.$route.path)
      this.$router.replace(this.$route.path);
    },
    scrollTo(target) {
      this.$parent.scrollTo(target);
    },
    sb_scrollTo(target) {
      this.$parent.scrollTo(target);
      this.showSidebar = false;
    },
    sb_login() {
      this.showSidebar = false;
      this.dialog = true;
    },
    parents(dialog) {
      this.dialog = dialog;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/navbar.scss";
@import "../css/style.scss";
header {
  position: relative;
}
a,
a:hover {
  color: initial;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  .btn-right {
    float: right;
    margin-right: 50px;
  }
}
.nav-item {
  float: left;
  padding: 0 20px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: $nav-highlight;
  }
}
.nav-fav {
  position: fixed;
  top: 0;
  right: 0;
  @include mobile {
    background: rgba(240, 248, 255, 0.5);
  }
}
</style>
