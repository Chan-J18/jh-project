<template>
  <body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item >
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item >
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left"><span style="color: #505458">记住我</span></el-checkbox>
    <el-form-item style="width:100%">
      <el-button :plain="true"  type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
    <el-form-item style="width:100%">
      <el-button :plain="true" type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      responseResult: [],
      checked: ''
    }
  },
  mounted () {
    if (this.$route.query.message) alert(this.$route.query.message)
  },
  methods: {
    login () {
      var _this = this
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successsResponse => {
          var message = successsResponse.data.message
          if (successsResponse.data.code === 200) {
            _this.$store.commit('login', _this.loginForm)
            // 记录原本访问路径（未登录前）
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
          } else {
            console.log(successsResponse.data.message)
          }
          this.$message(message)
        })
        .catch(failResponse => {
          if (failResponse.response) {
            console.log('响应失败')
          } else if (failResponse.request) {
            console.log('请求失败')
          }
        })
    },
    register () {
      this.$axios.post('/register', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          if (resp.data.code === 400) {
            this.loginForm.username = ''
            this.loginForm.password = ''
          }
          this.$message(resp.data.message)
        })
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 300px auto;
    width: 350px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background: url("../assets/Login/back_login.png") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
