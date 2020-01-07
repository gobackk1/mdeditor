import axios from 'axios'
import { eventBus } from '../../app'

const setFunc = index =>{
  state.category[index].category_has_memo = () => {
    const id = state.category[index].id
    const items = state.memo.filter(i => i.category_id == id && i.memo_is_trash == false)
    return items.length
  }
}

const state = {
  category:null,
  memo:null,
  currentItem:null,
  toggle:{
    editor:false,
    nav:false,
    menu:false
  },
}

const getters = {
  getItemById: state => id => state.memo.find(i => i.id === id),
  isFavorite: state => state.currentItem ? state.currentItem.memo_is_fav : false,
  isTrash: state => state.currentItem ? state.currentItem.memo_is_trash : false,
  getDataByKey: state => key => {
    let data
    if(key === 'fav' || key === 'trash'){
      const k = `memo_is_${key}`
      data = state.memo.filter(i => i[k] == true)
    } else if(key === 'all') {
      data = state.memo.filter(i => i.memo_is_trash == false)
    } else {
      data = state.memo.filter(i => i.category_id == key && i.memo_is_trash == false)
    }
    return data
  }
}

const mutations = {
  fetchItems(state,res){
    state.category = res.category
    state.memo = res.memo
    state.currentItem = res.memo[0]
    console.log('category')
    console.log(res.category)
    console.log('memo')
    console.log(res.memo)
    for(let i = 0; state.category.length > i; i++){
      setFunc(i)
    }
    eventBus.$emit('init', 'APIから取得完了（initイベント発行）')
  },
  clearItems(state){
    state.category = null
    state.memo = null
    state.currentItem = null
  },
  setCurrentItem(state, item){
    state.currentItem = item
  },
  storeCategory({ category }, data){
    category.push(data)
    const index = category.findIndex(i => i.id === data.id)
    setFunc(index)
  },
  updateCategory({ category }, item){
    const index = category.findIndex(i => i.id === item.id)
    category[index] = item
    setFunc(index)
  },
  deleteCategory({ category, memo }, { id }){
    const index = category.findIndex(i => i.id === id)
    category.splice(index, 1)
    const items = memo.filter( i => i.category_id != id)
    memo = items
  },
  storeItem({ memo }, data){
    memo.push(data)
    eventBus.$emit('item','created')
  },
  updateItem({ memo, currentItem }, item){
    const index = memo.findIndex(i => i.id === item.id)
    memo[index], currentItem = item
    eventBus.$emit('item','updated')
  },
  deleteItem({ memo }, { id }){
    const index = memo.findIndex(i => i.id === id)
    memo.splice(index, 1)
    eventBus.$emit('item','deleted')
  },
  clearTrash({ memo }, items){
    items.forEach(item => {
      const index = memo.findIndex(i => i.id === item.id )
      memo.splice(index, 1)
    })
    eventBus.$emit('item','cleared')
  },
  toggle({ toggle }, key){
    toggle[key] = !toggle[key]
  }
}

const actions = {
  async fetchItems({ commit }, id){
    const res = await axios.post('/api/userdata', id)
    commit('fetchItems', res.data)
  },
  clearItems({ commit }){
    commit('clearItems')
  },
  setCurrentItem({ commit },item){
    commit('setCurrentItem', item)
  },
  setCurrentCategory({ commit },id){
    commit('setCurrentCategory',id)
  },
  async setCategory({ commit }, data){
    const res = await axios.post('/api/create/category',data)
    commit('storeCategory', res.data)
  },
  async updateCategory({ commit }, item){
    const res = await axios.post('/api/update/category', item)
    commit('updateCategory', res.data)
  },
  async deleteCategory({ commit }, category){
    const res = await axios.post('/api/delete/category', category)
    commit('deleteCategory', res.data)
  },
  async createItem({ commit }, item){
    const res = await axios.post('/api/create/memo', item)
    commit('storeItem', res.data)
  },
  async updateItem({ commit }, item){
    const res = await axios.post('/api/update/memo', item)
    commit('updateItem', res.data)
  },
  async clearTrash({ commit }, items){
    const res = await axios.post('/api/clear/trash', items)
    commit('clearTrash', items)
  },
  toggle({ commit }, key){
    commit('toggle', key)
  },
}

const memodata = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default memodata;
