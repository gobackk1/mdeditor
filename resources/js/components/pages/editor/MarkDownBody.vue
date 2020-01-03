<template>
  <div>
    <div class="markdown-body" v-html="compiledMarkdown(content)"></div>
  </div>
</template>

<script>
  import markdownIt from 'markdown-it'
  export default {
    data(){
      return {
        fetchData:[],
        markdownIt: new markdownIt({
          highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
          },
          html: true,
          linkify: true,
          breaks: true,
          typographer: true
        })
      }
    },
    props:{
      content:{
        type:String
      }
    },
    methods:{
      compiledMarkdown(content){
        return this.markdownIt.render(content)
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    }
  }
</script>
