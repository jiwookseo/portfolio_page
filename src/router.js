import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import Articles from "./views/Articles.vue";
import PostPage from "./views/PostPage.vue";
import DetailPage from "./views/DetailPage";
import ArticleWriter from "./views/ArticleWriter";
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
      component: HomePage,
      meta: { transition: "fade" }
    },
    {
      path: "/portfolios",
      name: "Portfolios",
      component: Articles
    },
    {
      path: "/portfolio",
      component: PortfolioPage,
      children: [
        {
          path: "",
          redirect: "/portfolios"
        },
        {
          path: "new",
          name: "NewPortfolio",
          component: ArticleWriter
        },
        {
          path: ":id",
          name: "PortfolioDetailPage",
          component: DetailPage,
          props: true
        },
        {
          path: ":id/edit",
          name: "PortfolioUpdate",
          component: ArticleWriter,
          props: true
        }
      ]
    },
    {
      path: "/posts",
      name: "Posts",
      component: Articles
    },
    {
      path: "/post",
      component: PostPage,
      children: [
        {
          path: "",
          redirect: "/posts"
        },
        {
          path: "new",
          name: "NewPost",
          component: ArticleWriter
        },
        {
          path: ":id",
          name: "PostDetailPage",
          component: DetailPage,
          props: true
        },
        {
          path: ":id/edit",
          name: "PostUpdate",
          component: ArticleWriter,
          props: true
        }
      ]
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
