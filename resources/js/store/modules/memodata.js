import axios from 'axios'
import { eventBus } from '../../app'

const test1 = index =>{
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
      test1(i)
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
    test1(index)
    console.log(data);

  },
  updateCategory({ category }, item){
    const index = category.findIndex(i => i.id === item.id)
    category[index] = item
    test1(index)
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
  setCategory({ commit }, data){
    console.log(data);

    axios.post('/api/create/category',data)
      .then(res => commit('storeCategory', res.data))
      .catch(e => alert(e))
  },
  updateCategory({ commit }, item){
    axios.post('/api/update/category', item)
      .then(res => commit('updateCategory', res.data))
      .catch(e => alert(e))
  },
  deleteCategory({ commit }, category){
    axios.post('/api/delete/category', category)
      .then(res => commit('deleteCategory', res.data))
      .catch(e => alert(e))
  },
  createItem({ commit }, item){
    axios.post('/api/create/memo', item)
      .then(res => commit('storeItem', res.data))
      .catch(e => alert(e))
  },
  updateItem({ commit }, item){
    axios.post('/api/update/memo', item)
      .then(res => commit('updateItem', res.data))
      .catch(e => alert(e))
  },
  // deleteItem({ commit }, id){
  //   const req = {
  //     id: id
  //   }
  //   axios.post('/api/delete/memo', req)
  //     .then(res => commit('deleteItem', res.data))
  //     .catch(e => alert(e))
  // },
  clearTrash({ commit }, items){
    axios.post('/api/clear/trash', items)
      .then( res => commit('clearTrash', items))
      .catch(e => alert(e))
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
