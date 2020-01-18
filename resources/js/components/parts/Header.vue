<template>
  <header class="header">
    <div class="l-container">
      <RouterLink to="/"><h1 class="header__ttl">MDEditor</h1></RouterLink>
      <ul class="hdr-link" v-if="isLogin">
        <li class="hdr-link__item">{{ username }}</li>
        <li class="hdr-link__item"><button type="button" class="btn-logout" @click="logout">logout</button></li>
        <li class="hdr-link__item"><button type="button" class="btn-menu" @click="onClickMenuBtn"><i class="fas fa-ellipsis-v"></i></button></li>
      </ul>
      <ul class="hdr-link" v-else>
        <li><RouterLink to="/login" class="hdr-link__item btn-login">login</RouterLink></li>
        <li class="hdr-link__item"><button type="button" class="btn-menu" @click="onClickMenuBtn"><i class="fas fa-ellipsis-v"></i></button></li>
      </ul>
      <nav class="header__menu menu" v-show="$store.state.memodata.toggle.menu">
        <ul class="">
          <li v-for="menu in headerLink" :key="menu.label">
            <RouterLink :to="{name: menu.name}" class="menu__link">{{ menu.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data(){
      return {
        headerLink:[
          {label: 'editor', name: 'Home'},
          {label: 'patch note', name: 'PatchNote'},
          {label: 'help', name: 'Help'},
          {label: 'setting', name: 'Setting'},
        ]
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters['auth/checkLog']
      },
      username () {
        return this.$store.getters['auth/username']
      }
    },
    methods:{
      logout () {
        this.$store.dispatch('auth/logout').then(() => {
          this.clearItems()
          this.$router.push('/')
        })
      },
      onClickMenuBtn(){
        this.toggle('menu')
      },
      ...mapActions('memodata', [
        'clearItems',
        'toggle',
      ])
    },
  }
</script>

<style scoped lang="scss">
  .header{
    position: relative;
    background:#222222;
    color:#fff;
    padding: 8px 30px;
    border-bottom:1px solid #000;
    min-height: 37px;
    box-sizing:border-box;
    &__ttl{
      float:left;
      font-weight: bold;
    }
    &__menu{
      position: absolute;
      top: 30px;
      right: 0;
      z-index:1;
    }
    &::after{
      content:'';
      display:block;
      clear:both;
    }
  }
  .hdr-link{
    float:right;
    display:flex;
    &__item{
      &:not(:last-child){
        padding-right: 20px;
      }
    }
  }
  .menu{
    background:#222;
    &__link{
      padding: 10px;
      display:block;
      &:hover{
        opacity:.6;
      }
    }
  }
  .btn-menu{
    width: 20px;
    height: 20px;
    background: none;
    float:right;
  }
  .btn-logout, .btn-login{
    background:#fff;
    color:#444;
    font-size: 16px;
    border-radius:5px;
    padding:2px 7px;
  }
</style>
