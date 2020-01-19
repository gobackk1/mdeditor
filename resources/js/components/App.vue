<template>
  <div>
    <Header />
    <Content />
  </div>
</template>

<script>
  import Header from './parts/Header'
  import Content from './parts/Content'

  export default {
    components: {
      Header,
      Content
    }
  }
</script>
