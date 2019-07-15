<template>
  <header class="homeHeader">
    <ImgBanner :imgSrc="imgSrc" />
    <nav class="navbar">
      <div class="nav-logo text">{{websiteTitle}}</div>
      <FavBtn class="nav-fav" />
      <div></div>
      <div v-if="!user" class="login-btn text" @click.stop="dialog = true">Login</div>
      <div v-if="user" v-on:click="signOut" class="login-btn text">Logout</div>
      <ul class="nav-menus">
        <li
          v-for="menu in menus"
          class="text"
          :key="menu.name"
          @click="scrollTo(menu.target)"
        >{{ menu.name }}</li>
      </ul>
    </nav>
    <transition name="slide-fade">
      <nav class="sidebar" v-if="showSidebar">
        <div class="sb-nav-logo">{{websiteTitle}}</div>
        <ul>
          <li
            v-for="menu in menus"
            class="sb-nav-menu"
            :key="menu.name"
            @click="sb_scrollTo(menu.target)"
          >{{ menu.name }}</li>
          <li v-if="!user" class="sb-nav-menu text" @click.stop="dialog = true">Login</li>
          <li v-if="user" class="sb-nav-menu text" @click="signOut">Logout</li>
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
    <FavBtn class="sb-fav" />
    <v-dialog v-model="dialog" class="login-dialog" width="300" persistent>
      <LoginDialog @child="parents" :dialog="dialog" />
    </v-dialog>
  </header>
</template>

<script>
import ImgBanner from "./ImgBanner";
import FavBtn from "./FavBtn";
import LoginDialog from "./LoginDialog";
import { mapActions } from "vuex";

export default {
  name: "HeaderHome",
  components: {
    ImgBanner,
    FavBtn,
    LoginDialog
  },
  props: {
    websiteTitle: { type: String }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      imgSrc: "https://source.unsplash.com/random/1600x900/",
      dialog: false,
      showSidebar: false,
      menus: [
        { name: "About Me", target: "#aboutme" },
        { name: "Portfolio", target: "#portfolio" },
        { name: "Post", target: "#post" },
        { name: "Project", target: "#project" }
      ]
    };
  },
  methods: {
    ...mapActions(["logout"]),
    signOut() {
      this.logout();
      this.$swal("Goodbye!", "로그아웃 되었습니다", "success");
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
.homeHeader {
  width: 100%;
  height: calc(100vh + 50px);
  position: relative;
  @include mobile {
    height: 100vh;
  }
}
.navbar {
  position: absolute;
  bottom: 0;
  left: 0;
}
.nav-logo {
  float: left;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: $nav-highlight;
  }
}
.nav-menus {
  float: right;
  li {
    float: left;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      background: $nav-highlight;
    }
  }
}
.login-btn {
  float: right;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: $nav-highlight;
  }
}

.nav-fav {
  float: right;
}
.sb-fav {
  background: rgba(240, 248, 255, 0.5);
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  @include mobile {
    display: initial;
  }
}
</style>
