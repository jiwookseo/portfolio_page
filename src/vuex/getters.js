export default {
  user(state) {
    return state.user
  },
  admin(state) {
    return state.admin
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
  loginSuccess(state) {
    return state.loginSuccess
  },
  getPost: (state) => (id) => {
    return state.posts.find(post => post.id === id) || state.postExample
  },
  getPortfolio: (state) => (id) => {
    return state.portfolios.find(portfolio => portfolio.id === id) || state.portfolioExample
  },
  getUser: (state) => (id) => {
    return state.users.find(user => user.id === id) || state.userExample
  },
  checkIfAdmin(state) {  // return true if current user is either 1. 관리자 or 2. 팀원; otherwise return false
    if (state.user) {
      if (state.user.authority === "1" || state.user.authority === "2") {
        return true
      }
    }
    return false
  }
}
