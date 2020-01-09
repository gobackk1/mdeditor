<template>
  <div class="editor">
    <div class="editor__list">
      <input type="text" class="editor__search" @input="onChangeSearchInput" placeholder="検索">
      <div class="editor__list-area">
        <h2>MemoList</h2>
        <button type="button" class="create-memo" @click="onClickBtn()"><i class="far fa-edit fa-lg"></i></button>
          <ul id="memo-list">
        <transition-group name="list">
            <li
              v-for="memo in activeData"
              :key="memo.id"
              @click="onClickItem(memo)"
              :class="{ 'js-active': activeId === memo.id}"
              tabindex="0"
            >{{ memo.memo_title }}</li>
        </transition-group>
          </ul>
      </div>
    </div>
    <div class="editor__stage">
      <Stage :active-data="activeData" />
    </div>
  </div>
</template>

<script>
import Stage from './Stage.vue'
import { mapActions } from 'vuex'
import { eventBus } from '../../../app'

export default {
  data(){
    return {
      fetchData: [],
      activeData: [],
      // searching:false
    }
  },
  watch:{
    '$route' (to, from){
      this.setActiveData()
    }
  },
  created(){
    this.fetchData = this.$store.state.memodata
    this.setActiveData()
  },
  mounted(){
    eventBus.$on('item', () =>{
      this.setActiveData()
    })
  },
  computed:{
    activeId(){
      return this.fetchData.currentItem ? this.fetchData.currentItem.id : 0
    }
  },
  methods:{
    setActiveData(){
      this.activeData = this.$store.getters['memodata/getDataByKey'](this.$route.params.id)
    },
    onClickItem(item){
      this.setCurrentItem(item)
    },
    onClickBtn(){
      const memoTitle = prompt('タイトルを入力して下さい。')
      const memo = {
        memoTitle: memoTitle,
        categoryId: this.$route.params.id,
        userId: this.$store.getters['auth/userId'],
      }
      if(memoTitle){
        this.createItem(memo)
      }
    },
    onChangeSearchInput(e){
      const val = e.target.value
      const items = this.$store.getters['memodata/getDataByKey'](this.$route.params.id)
      const result = items.filter(i => i.memo_body.indexOf(val) !== -1)
      this.setCurrentItem(result[0])
      this.activeData = result
    },
    ...mapActions('memodata',[
      'setCurrentItem',
      'createItem'
    ]),
  },
  components:{
    Stage
  }
}

</script>

<style scoped lang="scss">
  .list-enter-active,.list-leave-active{
    transition:opacity .5s;
  }
  .list-leave-active{
    display:none;
  }
  .list-enter,.list-leave-to{
    opacity:0;
  }
  .list-enter-to{
    opacity:1;
  }
  .editor{
    display: flex;
    justify-content: space-between;
    flex:auto;
    &__search{
      width: 100%;
      box-sizing: border-box;
      border: none;
      font-size: 18px;
      padding: 5px;
      margin-bottom: 20px;
      background:#fafafa;
    }
    &__list{
      width: 250px;
      background: #FAFAFA;
      padding:10px;
      height: calc(100vh - 36px);
      border-right:1px solid #eaeaea;
      resize: horizontal;
      overflow:hidden;
      position:relative;
      box-sizing:border-box;
    }
    &__list-area{
      position:relative;
      color:#555;
    }
    &__stage{
      flex:auto;
    }
  }
  h2{
    font-weight: bold;
    margin-bottom: 10px;
  }
  li{
    display: block;
    padding: 10px 10px 10px 20px;
    position: relative;
    border-bottom: 1px solid #ccc;
    cursor:pointer;
    &::before{
      // display:none;
      font-family: "Font Awesome 5 free";
      content: '\f15c';
      font-weight: 400;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0px;
      margin:auto;
      height: 16px;
    }
    &:not(.js-active):hover{
      background:#e8e8e8;
    }
  }
  .js-active{
    background:#cacaca;
  }
  button{
    background:none;
    border:none;
    color:inherit;
    position: absolute;
    top: 0px;
    right: 0px;
    transition:.3s;
    cursor:pointer;

    &:hover{
      transform:scale(1.2);
    }
  }
</style>
