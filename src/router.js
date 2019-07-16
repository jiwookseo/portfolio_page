import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import PortfolioPage from './views/PortfolioPage.vue';
import PostPage from './views/PostPage.vue';
import AdminPage from './views/AdminPage.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'main',
      component: HomePage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage
    },
    {
      path: '/post',
      name: 'post',
      component: PostPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
