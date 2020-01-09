<template>
  <div class="toolbar">
    <button
      class="toolbar__btn--fav"
      :class="setClazzByKeyProps('memo_is_fav', '_fav-is-true', '_fav-is-false')"
      type="button"
      @click="onClickFav(fetchData.currentItem.id)"
    >
      <i class="fa-star fa-lg" :class="setClazzByKeyProps('memo_is_fav', 'fas', 'far')"></i>
    </button>
    <button
      class="toolbar__btn--del"
      :class="setClazzByKeyProps('memo_is_trash', '_trash-is-true', '_trash-is-false')"
      type="button"
      @click="onClickTrash(fetchData.currentItem.id)"
    >
      <i class="fas fa-trash-alt fa-lg"></i>
    </button>
    <button class="toolbar__btn--edit" type="button" @click="onClickEdit(fetchData.currentItem.id)">
      <i class="fas fa-pen fa-lg"></i>
    </button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { eventBus } from '../../../app'

  export default {
    data(){
      return {
        fetchData:[],
        confirmText:'このメモをゴミ箱へ移動しますか？',
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    methods:{
      setClazzByKeyProps(key, trueClazz, falseClazz){
        let clazz
        if(this.$store.getters['memodata/checkCurrentItemProps'](key) == true){
          clazz = trueClazz
        } else {
          clazz = falseClazz
        }
        return clazz
      },
      onClickEdit(id){
        this.toggle('editor')
        this.editItem(id)
      },
      onClickTrash(id){
        const item = this.getItemById(id)
        if(item.memo_is_fav == true){
          alert('お気にり登録したメモはゴミ箱へ移動できません。')
          return
        }
        item.memo_is_trash === '0'
          ? item.memo_is_trash = true
          : item.memo_is_trash = !item.memo_is_trash
        this.updateItem(item)
        const items = this.$store.getters['memodata/getDataByKey'](this.$route.params.id)
        this.setCurrentItem(items[0])
      },
      onClickFav(id){
        const item = this.getItemById(id)
        item.memo_is_fav === '0'
          ? item.memo_is_fav = true
          : item.memo_is_fav = !item.memo_is_fav
        this.updateItem(item)
      },
      editItem(id){
        const item = this.getItemById(id)
        this.updateItem(item)
      },
      getItemById(id){
        const item = this.$store.getters['memodata/getItemById'](id)
        return item
      },
      ...mapActions('memodata', [
        'updateItem',
        'setCurrentItem',
        'toggle'
      ])
    }
  }
</script>

<style scoped lang="scss">
  %toolbar__btn--cmn{
    float:right;
    cursor:pointer;
    border:none;
    padding: 10px;
    margin-left: 10px;
    box-sizing:border-box;
    &:hover{
      background: #ccc;
    }
  }
  .toolbar{
    padding: 0 30px;
    margin-bottom: 30px;
    &::after{
      content:'';
      display: block;
      clear:both;
    }
    &__category{
      float:left;
    }
    &__btn{
      &--fav{
        @extend %toolbar__btn--cmn;
        &._fav-is-true{
          color :#ffdf3b;
        }
        &._fav-is-false{
          color :#666;
        }
      }
      &--del{
        @extend %toolbar__btn--cmn;
        &._trash-is-true{
          color:red;
        }
        &._trash-is-false{
          color:#666
        }
      }
      &--edit{
        @extend %toolbar__btn--cmn;
      }
    }
  }

</style>
