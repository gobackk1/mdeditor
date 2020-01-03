import Vue from 'vue'
import Vuex from 'vuex'
import memodata from './modules/memodata'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memodata,
    auth
  }
})
export default store
