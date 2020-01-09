<template>
  <div class="content" :class="fetchData.toggle.nav ? '_tgl-nav-true' : '_tgl-nav-false'">
    <nav class="nav">
      <ul class="nav__head nav-total">
        <li
          v-for="total in categoryTotal"
          :key="total.elid"
          @click="onClickTotalLink"
          @click.right.prevent="onRightClick(total.key)"
        >
          <RouterLink
            class="nav-total__link"
            :to="{name: 'Category', params: {id: total.id}}"
            :id="`btn-${total.id}`"
          >{{ total.label }}<div class="nav-total__num">{{ getTotalNumberByKey(total.key) }}</div>
          </RouterLink>
        </li>
      </ul>
      <div class="nav__body">
        <h2 class="nav__ttl">CategoryList</h2>
        <button type="button" class="create-category" @click="createCategory" :disabled="btnDisabledFrag"><i class="fas fa-plus fa-lg"></i></button>
        <ul>
          <CategoryListItem
            v-for="category in fetchData.category"
            :key="category.id"
            :category="category"
          ></CategoryListItem>
        </ul>
      </div>
      <button class="nav__toggle" type="button" @click="toggleNav"><i class="fas fa-angle-double-left fa-2x"></i></button>
    </nav>
    <transition>
      <RouterView />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import CategoryListItem from '../pages/editor/CategoryListItem'

  export default {
    data(){
      return {
        fetchData:{},
        categoryTotal:[
          {
            id:'all',
            key:'all',
            label:'All',
          },
          {
            id:'fav',
            key:'memo_is_fav',
            label:'Favorite',
          },
          {
            id:'trash',
            key:'memo_is_trash',
            label:'Trash',
          },
        ]
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    computed:{
      btnDisabledFrag(){
        return this.$store.getters['auth/checkLog'] ? false : true
      }
    },
    methods:{
      getTotalNumberByKey(key){
        if(!this.$store.state.memodata.category){
          return 0
        }
        let counter = 0
        let k = ''
        let cond = true
        if(key === 'all'){
          k = 'memo_is_trash'
          cond = false
        } else {
          k = key
        }
        this.fetchData.memo.forEach(i => {
          if(i[k] == cond){
            counter++
          }
        })
        return counter
      },
      createCategory(){
        const categoryName = prompt('カテゴリー名を入力して下さい。')
        if(categoryName){
          let req = {
            name: categoryName,
            userId: this.$store.getters['auth/userId']
          }
          this.setCategory(req)
        }
      },
      toggleNav(){
        this.toggle('nav')
      },
      onRightClick(key){
        if(key !== 'memo_is_trash') return
        if(confirm('ゴミ箱のメモを全て削除してよろしいですか？')){
          this.clearTrash()
        }
      },
      onClickTotalLink(){
        if(!this.$store.getters['auth/checkLog']) {
          return
        }
        const items = this.$store.getters['memodata/getDataByKey'](this.$route.params.id)
        this.setCurrentItem(items[0])
      },
      ...mapActions('memodata',[
        'setCategory',
        'setCurrentItem',
        'deleteCategory',
        'clearTrash',
        'toggle'
      ])
    },
    components:{
      CategoryListItem
    }
  }
</script>

<style scoped lang="scss">
  .v-enter-active,{
    transition-property:opacity visibility;
    transition-duration:.5s;
  }

  .v-leave-active{
    display:none;
  }

  .v-enter{
    opacity:0;
    visibility:hidden;
  }
  .v-enter-to{
    opacity:1;
    visibility:visible;
  }

  .content{
    height: calc(100vh - 37px);
    display:flex;
    transition:transform .3s ease;
    &._tgl-nav-true{
      transform: translateX(-200px);
      margin-right: -200px;
    }
    &._tgl-nav-false{
      transform: translateX(-0px);
      margin-right: 0px;
    }
  }

  .nav{
    position:relative;
    box-sizing:border-box;
    background:#232628;
    color:#c5c5c5;
    padding:10px;
    height: calc(100vh - 36px);
    width: 250px;
    &__ttl{
      margin-bottom: 20px;
      font-weight: bold;
      // color:#fff;
    }
    &__head{

    }
    &__body{
      position:relative;
      height: 100%;
    }
    &__toggle{
      position: absolute;
      bottom: 10px;
      right: 6px;
      width: 20px;
      height: 20px;
      i{
        transition:.6s;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin:auto;
      }
      ._tgl-nav-true & i{
        transform:rotate(180deg);
      }
    }
  }

  .nav-total{
    margin-bottom: 20px;
    &__link{
      position:relative;
      display:block;
      padding: 10px;
      box-sizing:border-box;
      &:not(.router-link-exact-active):hover{
        background:#224e4b;
        color:#47cec5;
      }
      &.router-link-exact-active{
        color:#35f5e8;
        background:#4a8682;
      }
    }
    &__num{
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      margin:auto;
      display: inline-block;
      height: 15px;
    }
  }

  .create-category{
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 0;
    &:hover{
      color:#fff;
    }
  }
</style>
