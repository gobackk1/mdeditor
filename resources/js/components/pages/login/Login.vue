<template>
  <div class="under-page">
    <div class="l-container">
      <div class="login-form">
        <ul class="login-form__tab">
          <li
            class="login-form__tab-item"
            @click="tab = 1"
            :class="tab === 1 ? '_active' : ''"
          >Login</li>
          <li
            class="login-form__tab-item"
            @click="tab = 2"
            :class="tab === 2 ? '_active' : ''"
          >Register</li>
        </ul>
        <ul class="login-form__stage">
          <li
            class="login-form__stage-panel"
            :class="{'_active': tab === 1 }"
            @click="tab = 1"
          >
            <div class="panel" v-show="tab === 1">
              <form class="form" @submit.prevent="login">
                <label for="login-name">UserName</label>
                <input type="text" class="form__item" id="login-name" v-model="loginForm.name">（testuser）<br>
                <label for="login-password">Password</label>
                <input type="password" class="form__item" id="login-password" v-model="loginForm.password">（testuser）
                <button type="submit" class="form__button">login</button>
              </form>
            </div>
          </li>
          <li
            class="login-form__stage-panel"
            :class="{'_active': tab === 2 }"
            @click="tab = 2"
          >
            <div class="panel" v-show="tab === 2">
              <form class="form" @submit.prevent="register">
                <label for="username">Name</label>
                <input type="text" class="form__item" id="username" v-model="registerForm.name"><br>
                <label for="email">Email</label>
                <input type="text" class="form__item" id="email" v-model="registerForm.email"><br>
                <label for="password">Password</label>
                <input type="password" class="form__item" id="password" v-model="registerForm.password"><br>
                <label for="password-confirmation">Password (confirm)</label>
                <input type="password" class="form__item" id="password-confirmation" v-model="registerForm.password_confirmation">
                <button type="submit" class="form__button">register</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tab: 1,
        loginForm: {
          name: '',
          password: '',
        },
        registerForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
      }
    },
    methods:{
      async register () {
        await this.$store.dispatch('auth/register', this.registerForm)
        this.$router.push('/Category')
      },
      async login () {
        await this.$store.dispatch('auth/login', this.loginForm)
        let req = {id:null}
        req.id = this.$store.getters['auth/userId']
        this.fetchItems(req)
      },
      async fetchItems(req){
        await this.$store.dispatch('memodata/fetchItems', req)
        this.$router.push('/Category/all')
        document.getElementById('btn-all').click()
      }
    }
  }
</script>
<style scoped lang="scss">
  .login-form{
    position:relative;
    &__tab{
      position:relative;
      z-index:1;
      margin-bottom: -1px;
      &::after{
        content:'';
        display:block;
        clear:both;
      }
    }
    &__tab-item{
      float:left;
      padding:5px;
      border-top:1px solid;
      border-left:1px solid;
      border-right:1px solid;
      box-sizing:border-box;
      &._active{
        background: #f5f5f5;
        border-bottom:1px solid #f5f5f5;
      }
    }
    &__stage{
      border:1px solid #000;
      box-sizing:border-box;
      position:relative;
      z-index:0;
      padding:30px;
      background:#f5f5f5;
    }
  }
  .form{
    label{
      width: 100px;
      margin-bottom: 20px;
      display: inline-block;
    }
    &__button{
      display:block;
      font-size: 16px;
      border:1px solid;
      border-radius:5px;
    }
  }

</style>
