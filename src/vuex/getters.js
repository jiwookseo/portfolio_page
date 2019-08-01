export default {
  user: state => state.user,
  userAll: state => state.userAll,
  admin: state => state.admin,
  loading: state => state.loading,
  error: state => state.error,
  loginSuccess: state => state.loginSuccess,
  portfolios: state => state.portfolios,
  posts: state => state.posts,
  spinner: state => state.spinner,
  askSnackbar: state => state.askSnackbar,
  alertSnackbar: state => state.alertSnackbar,
  getArticle: state => (type, id) => {
    if (type === "portfolio")
      return (
        state.portfolios.find(portfolio => portfolio.id === id) ||
        state.portfolioExample
      );
    else return state.posts.find(post => post.id === id) || state.postExample;
  },
  checkIfAdmin(state) {
    // return true if current user is either 1. 관리자 or 2. 팀원; otherwise return false
    if (state.user) {
      if (state.user.authority === "1" || state.user.authority === "2") {
        return true;
      }
    }
    return false;
  }
};
