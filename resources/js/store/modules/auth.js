const state = {
  user:null
}

const getters = {
  checkLog: state => !! state.user,
  username: state => state.user ? state.user.name : '',
  userId: state => state.user ? state.user.id : null,
}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  async register ({ commit }, data) {
    const res = await axios.post('/api/register', data)
    commit('setUser', res.data)
  },
  async login ({ commit }, data) {
    const res = await axios.post('/api/login', data)
    commit('setUser', res.data)
  },
  async logout ({ commit }) {
    const res = await axios.post('/api/logout')
    commit('setUser', null)
  },
  async currentUser ({ commit }) {
    const res = await axios.get('/api/user')
    const user = res.data || null
    commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
