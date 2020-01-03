<template>
  <div>
    <Toolbar />
    <div
      v-for="memo in activeData"
      :key="memo.id"
      v-show=" activeId === memo.id"
      class="memo"
      @click.right.prevent="onRightClickView"
    >
      <textarea name="body" v-model="memo.memo_body" v-show="fetchData.toggle.editor"></textarea>
      <MarkDownBody :content="memo.memo_body" v-show="!fetchData.toggle.editor"></MarkDownBody>
    </div>
  </div>
</template>

<script>
  import MarkDownBody from './MarkDownBody'
  import Toolbar from './Toolbar'

  export default {
    data(){
      return {
        fetchData:[],
        editButton:''
      }
    },
    props:{
      activeData:{
        type: Array
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    mounted(){
      this.editButton = document.querySelector('.toolbar__btn--edit')
    },
    computed:{
      activeId(){
        return this.fetchData.currentItem ? this.fetchData.currentItem.id : 0
      }
    },
    methods:{
      onRightClickView(){
        this.editButton.click()
      },
    },
    components:{
      MarkDownBody,
      Toolbar
    },
  }
</script>

<style scoped lang="scss">
  .memo{
    height: calc(100vh - 36px);
    padding: 20px 30px 0;
    box-sizing:border-box;
    overflow-y:auto;
    word-break:break-all;
  }
  textarea{
    width: 100%;
    height: 90%;
    box-sizing:border-box;
    font-size: 110%;
  }
</style>
