import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import PostPage from "./views/PostPage.vue";
import DetailPage from "./views/DetailPage";
import AdminPage from "./views/AdminPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      name: "main",
      component: HomePage
    },
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/portfolio/:id",
      name: "PortfolioDetailPage",
      component: DetailPage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/post/:id",
      name: "PostDetailPage",
      component: DetailPage
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
