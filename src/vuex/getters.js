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
  }
}
