<template>
  <header>
    <nav class="navbar">
      <router-link to="/">
        <div class="nav-item nav-logo">
          <div class="team6-logo">
            <div>TS</div>
          </div>
        </div>
      </router-link>
      <div class="btn-right">
        <router-link to="/portfolios">
          <div class="nav-item text">Portfolio</div>
        </router-link>
        <router-link to="/posts">
          <div class="nav-item text">Post</div>
        </router-link>
        <div v-if="!user" class="nav-item login-btn text" @click.stop="dialog = true">Login</div>
        <div v-if="user" @click="signOut" class="nav-item login-btn text">Logout</div>
      </div>
    </nav>
    <div class="sidebar-block" v-if="showSidebar"></div>
    <transition name="slide-fade">
      <nav class="sidebar" v-if="showSidebar">
        <router-link to="/">
          <div class="sb-nav-logo">
            <div class="team6-logo">
              <div>TS</div>
            </div>
          </div>
        </router-link>
        <ul style="padding-left: 0;">
          <router-link to="/portfolios">
            <li class="sb-nav-menu text">Portfolio</li>
          </router-link>
          <router-link to="/posts">
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
    <v-dialog v-model="dialog" class="login-dialog" width="300" persistent>
      <LoginDialog @child="parents" />
    </v-dialog>
  </header>
</template>

<script>
import FavBtn from "@/components/Header/FavBtn";
import LoginDialog from "@/components/Header/LoginDialog";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeaderSub",
  components: {
    FavBtn,
    LoginDialog
  },
  computed: {
    ...mapGetters(["user"])
  },
  props: {},
  data() {
    return {
      dialog: false,
      showSidebar: false
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
  color: white;
}
.nav-item {
  float: left;
  padding: 0 20px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: $nav-highlight;
  }
  color: white;
}
.nav-logo {
  color: $blue-accent;
  &:hover {
    background: $nav-bg;
    animation: logo-color 0.4s linear infinite alternate;
  }
}
.nav-fav {
  position: fixed;
  top: 0;
  right: 0;
  color: white;
  @include mobile {
    background: rgba(240, 248, 255, 0.5);
    color: initial;
  }
}
</style>
