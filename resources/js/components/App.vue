<template>
  <div>
    <Header />
    <Content />
  </div>
</template>

<script>
  import Header from './parts/Header'
  import Content from './parts/Content'
  import 'github-markdown-css'

  export default {
    components: {
      Header,
      Content
    }
  }
</script>
