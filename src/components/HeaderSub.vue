<template>
  <header>
    <nav class="navbar">
      <div class="nav-item text">
        <router-link to="/">HOME</router-link>
      </div>
      <div class="btn-right">
        <router-link to="/portfolio" @click="log">
          <div class="nav-item text">Portfolio</div>
        </router-link>
        <router-link to="/post">
          <div class="nav-item text">Post</div>
        </router-link>
        <div class="nav-item login-btn text" @click.stop="dialog = true">Login</div>
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
          <li class="sb-nav-menu text" @click.stop="sb_login">Login</li>
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
    <v-dialog v-model="dialog" class="login-dialog" width="400">
      <LoginDialog />
    </v-dialog>
  </header>
</template>

<script>
import FavBtn from "./FavBtn";
import LoginDialog from "./LoginDialog";

export default {
  name: "HeaderSub",
  components: {
    FavBtn,
    LoginDialog
  },
  props: {},
  data() {
    return {
      dialog: false,
      showSidebar: false
    };
  },
  methods: {
    sb_login() {
      this.showSidebar = false;
      this.dialog = true;
    },
    log() {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/navbar.scss";
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
    background: #bbbbbb;
  }
}
.nav-fav {
  position: fixed;
  top: 0;
  right: 0;
  @include mobile {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>
