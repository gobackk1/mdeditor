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
  register ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/api/register', data).
        then(res => {
          commit('setUser', res.data)
          resolve()
        })
    })
  },
  // async/awaitを使うなら
  // async register ({ commit }, data) {
  //   const res = await axios.post('/api/register', data)
  //   commit('setUser', res.data)
  // },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/api/login', data).then(res => {
        commit('setUser', res.data)
        resolve()
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/api/logout').then(res => {
        commit('setUser', null)
        resolve()
      })
    })
  },
  currentUser ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user').then(res => {
        const user = res.data || null
        commit('setUser', user)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
