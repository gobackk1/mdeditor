import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import Home from './components/pages/home/Home'
import Editor from './components/pages/editor/Editor'
import PatchNote from './components/pages/patchnote/PatchNote'
import Help from './components/pages/help/Help'
import Setting from './components/pages/setting/Setting'
import Login from './components/pages/login/Login'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path:'/category/:id',
    name:'Category',
    component:Editor
  },
  {
    path:'/patchnote',
    name:'PatchNote',
    component:PatchNote
  },
  {
    path:'/help',
    name:'Help',
    component:Help
  },
  {
    path:'/setting',
    name:'Setting',
    component:Setting
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.afterEach((to,from)=>{
  // store.dispatch('memodata/initCurrentItem')
});

export default router
