<template>
  <div class="login-bar">
    <header>
      <h1>八角书斋</h1>
      <p>在八角书斋分享你的知识、经验和见解</p>
    </header>
    <el-input
      placeholder="请输入帐号"
      v-model="account"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      type="password"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入验证码"
      v-model="captcha"
      clearable>
      <img slot="append" src="/api/auth/captcha">
    </el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
  import apiLogin from '../api';

  export default {
    name: 'login-bar',
    data: () => ({
      account: '',
      password: '',
      captcha: '',
    }),
    methods: {
      login() {
        apiLogin(this.account, this.password, this.captcha).then((response) => {
          response.text().then((data) => {
            const responseCode = JSON.parse(data).responseCode;
            if (responseCode === '00') {
              this.$router.push('/home');
            }
          });
        }, (error) => {
          console.log(error.message);
        });
      },
    },
  };
</script>

<style>
  .login-bar header * {
    text-align: center;
  }

  .login-bar h1 {
    font-size: 1.5em;
    margin: .6em 0;
  }

  .login-bar .el-input-group__append {
    padding: 0;
    border: 0;
  }

  .login-bar .el-button.el-button--primary {
    width: 100%;
  }
</style>
