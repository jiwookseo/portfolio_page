import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

const state = {
  admin: "admin@admin.com",
  user: null,
  loading: false,
  error: null,
  loginSuccess: false,
  posts: [{id: '1', created_at: { seconds: 0 }}],
  postExample: {
    title: "",
    content: "",
    created_at: { seconds: 0 }
  },
  portfolios: [{id: '1'}],
  portfolioExample: {
    title: "",
    content: "",
    img: "",
    created_at: { seconds: 0 }
  },
  userExample: {
    email: "",
    authority: ""
  },
  userAll: [],
  userInfo: null
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    loginSuccess(state, payload) {
      state.loginSuccess = payload;
    },
    getPosts(state, payload) {
      state.posts = payload;
    },
    getPortfolios(state, payload) {
      state.portfolios = payload;
    },
    getUserAll(state, payload) {
      state.userAll = payload;
    },
    getUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setUserPhoto(state, payload) {
      state.user.photoURL = payload;
    }
  }
});
