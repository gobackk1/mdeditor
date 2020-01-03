<template>
  <li class="list-item" v-if="fetchData" @click="onClickLink">
    <RouterLink :to="{ name:'Category', params: {id: category.id}}" class="list-item__link">
      <span class="list-item__text">{{ category.category_name }}</span>
      <span class="list-item__num">{{ category.category_has_memo() }}</span>
    </RouterLink>
    <button class="list-item__folder" type="button" @click="folderButton(category)">
      <i class="fas fa-folder fa-lg" :style="iconStyles"></i>
    </button>
    <button class="list-item__edit--name" type="button" @click="editButton(category)">
      <i class="fas fa-pen"></i>
      </button>
    <button class="list-item__edit--del" type="button" @click="deleteButton(category)">
      <i class="fas fa-times"></i>
    </button>
    <input class="list-item__input--color" name="folder" type="color" v-if="toggle.folder" v-model="category.category_icon">
    <input class="list-item__input--name" name="name" type="text" v-if="toggle.edit" v-model="category.category_name">
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import { eventBus } from '../../../app'

export default {
  data(){
    return {
      fetchData:{},
      toggle:{
        edit:false,
        folder:false
      },
      color:'#ffffff'
    }
  },
  props:{
    category:{
      type: Object
    }
  },
  created(){
    this.fetchData = this.$store.state.memodata
  },
  computed:{
    iconStyles(){
      return `color: ${this.category.category_icon};`
    }
  },
  methods:{
    onClickLink(){
      const items = this.$store.getters['memodata/getDataByKey'](this.$route.params.id)
      this.setCurrentItem(items[0])
    },
    deleteButton(category){
      if(confirm('カテゴリーを削除しても良いですか？カテゴリーに属すメモも同時に削除されます。（ゴミ箱に残りません）')){
        this.deleteCategory(category);
      }
    },
    editButton(category){
      this.toggle.edit = !this.toggle.edit
      if(!this.toggle.edit) {
        //不具合あり
        // this.$nextTick(() => document.querySelector('[name="name"]').focus())
        this.updateCategory(category)
      }
    },
    folderButton(category){
      this.toggle.folder = !this.toggle.folder
      this.updateCategory(category)
    },
    ...mapActions('memodata',[
      'setCurrentItem',
      'deleteCategory',
      'updateCategory'
    ])
  }
}
</script>
<style lang="scss" scoped>

  %list-item__edit{
    visibility:hidden;
    opacity:0;
    transition:0s;
    li:hover &{
      opacity:1;
      visibility:visible;
      transition:.5s;
    }
  }
  .list-item{
    position:relative;
    &__link{
      display:block;
      padding: 10px 50px 10px 30px;
      position: relative;
      &:not(.router-link-exact-active):hover{
        background:#224e4b;
        color:#47cec5;
      }
      &.router-link-exact-active{
        color:#35f5e8;
        background:#4a8682;
      }
    }
    &__text{
      line-height: 1.2;
      min-height: 18px;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      display: inline-block;
      width: 100%;
    }
    &__folder{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
    &__edit{
      &--name{
        @extend %list-item__edit;
        position: absolute;
        right: 40px;
        top: 0;
        bottom: 0;
      }
      &--del{
        @extend %list-item__edit;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
      }
    }
    &__num{
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      height: 20px;
      margin:auto;
    }
    &__input{
      &--name,&--color{
        position: absolute;
        left: 30px;
        top: 0;
        bottom: 0;
        margin:auto;
        width: 120px;
        font-size: 16px;
        height: 20px;
      }
      &--name{
        background:#111;
        color:#fff;
        border:none;
      }
    }
    &::after{
      content:'';
      display:block;
      clear:both;
    }
  }
</style>
