<template>
  <div>
    <div class="markdown-body" v-html="compiledMarkdown"></div>
    <!-- <markdown-it-vue class="markdown-body" :content="content" :options="options" /> -->
  </div>
</template>

<script>
  // import MarkdownItVue from 'markdown-it-vue'
  // import 'markdown-it-vue/dist/markdown-it-vue.css'
  // import mark from 'markdown-it-mark'
  import MarkdownIt from 'markdown-it'
  import checkbox from 'markdown-it-checkbox'
  import sanitizer from 'markdown-it-sanitizer'
  import footnote from 'markdown-it-footnote'
  import container from 'markdown-it-container'
  import mark from 'markdown-it-mark'
  import highlightjs from 'markdown-it-highlightjs'

  export default {
    data(){
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        breaks: true,
        typographer: true
      })
      .use(checkbox, {disabled: true})
      .use(highlightjs)
      .use(sanitizer)
      // .use(resizeImg, { autofill: true })
      .use(mark)
      .use(footnote)
      .use(container, "info")
      .use(container, "success")
      .use(container, "warning")
      .use(container, "danger")

      return {
        fetchData:[],
        markdownIt: md,
      }
    },
    props:{
      content:{
        type:String
      }
    },
    mounted(){
      // this.$refs.MarkdownItVue.use(checkbox)
    },
    computed:{
      compiledMarkdown(){
        return this.markdownIt.render(this.content)
      }
    },
    created(){
      this.fetchData = this.$store.state.memodata
    },
    components: {
      // MarkdownItVue
    }
  }
</script>
