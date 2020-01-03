import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './components/App.vue'
import { getCookieValue } from './util'

export const eventBus = new Vue()

const xsrfField = () => {
  window.axios = require('axios')
  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  window.axios.interceptors.request.use(config => {
    config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN')
    return config
  })
}

const createApp = async () => {
  await store.dispatch('auth/currentUser')
  let req = {id:null}
  req.id = store.getters['auth/userId']
  fetchData(req)
}

const fetchData = async (id) => {
  await store.dispatch('memodata/fetchItems', id)
  window.vm = new Vue ({
    el:'#app',
    router,
    store,
    render: h => h(App),
  })
}

xsrfField()
createApp()
