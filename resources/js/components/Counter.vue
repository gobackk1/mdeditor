<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="increment">increment</button>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        count: 0
      }
    },
    methods:{
      increment(){
        this.count++
      }
    }
  }
</script>
