<template>
  <header class="homeHeader">
    <ImgBanner />
    <nav class="navbar">
      <div class="nav-logo">
        <div class="team6-logo" @click="scrollToTop">
          <div>TS</div>
        </div>
      </div>
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
    <div class="sidebar-block" v-if="showSidebar"></div>
    <transition name="slide-fade">
      <nav class="sidebar" v-if="showSidebar">
        <div class="sb-nav-logo">
          <div class="team6-logo" @click="scrollToTop">
            <div>TS</div>
          </div>
        </div>
        <ul style="padding-left: 0;">
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
import ImgBanner from "@/components/Header/ImgBanner";
import FavBtn from "@/components/Header/FavBtn";
import LoginDialog from "@/components/Header/LoginDialog";
import { mapActions, mapState } from "vuex";

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
    ...mapState(["user"])
  },
  data() {
    return {
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
  created() {
    window.addEventListener("click", this.sidebarSlideIn);
    this.sidebarSlideIn();
  },
  destroyed() {
    window.removeEventListener("click", this.sidebarSlideIn);
  },
  methods: {
    sidebarSlideIn(event) {
      if (this.showSidebar && event) {
        if (event.clientX > 180) {
          this.showSidebar = false;
        }
      }
    },
    ...mapActions(["logout"]),
    signOut() {
      this.logout();
      this.$swal("Goodbye!", "Logout successful", "success");
      this.$router.replace(this.$route.path);
    },
    scrollTo(target) {
      this.$parent.scrollTo(target);
    },
    sb_scrollTo(target) {
      this.$parent.scrollTo(target);
      this.showSidebar = false;
    },
    scrollToTop() {
      this.showSidebar = false;
      setTimeout(function() {
        $("html, body").animate(
          {
            scrollTop: 0
          },
          700
        );
      }, 200);
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
@import "@/css/style.scss";
@import "@/css/navbar.scss";

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
  font-weight: bold;
  padding: 0 20px;
  cursor: pointer;
  color: $blue-accent;
  &:hover {
    animation: logo-color 0.4s linear infinite alternate;
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
  color: initial;
}
</style>
