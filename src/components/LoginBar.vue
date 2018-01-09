<template>
  <div class="login-bar">
    <header>
      <h1>登录呵呵问答</h1>
      <p>在呵呵问答分享你的知识、经验和见解</p>
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
      <img @click="changeCaptcha" slot="append" src="/api/auth/captcha">
    </el-input>
    <el-button type="primary" @click="login">登录</el-button>
    <el-alert
      v-if="errorMsg !== ''"
      :title="errorMsg"
      type="error"
      center
      show-icon>
    </el-alert>
  </div>
</template>

<script>
  import { apiLogin } from '../api';

  export default {
    name: 'login-bar',
    data: () => ({
      account: '',
      password: '',
      captcha: '',
      errorMsg: '',
    }),
    methods: {
      login() {
        if (this.account !== '' && this.password !== '' && this.captcha !== '') {
          apiLogin(this.account, this.password, this.captcha).then((response) => {
            response.text().then((data) => {
              const responseCode = JSON.parse(data).responseCode;
              if (responseCode === '00') {
                window.bus.$emit('login');
                this.$router.push('/home');
              } else {
                this.errorMsg = JSON.parse(data).responseMsg;
              }
            });
          }, (error) => {
            console.log(error.message);
          });
        } else {
          this.errorMsg = '请将信息填写完整';
        }
      },
      changeCaptcha() {
        document.querySelector('.el-input-group__append img').src = '/api/auth/captcha';
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

  .login-bar {
    margin: 10px;
  }

  .login-bar .el-input,
  .login-bar .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  .login-bar .el-input-group__append {
    padding: 0;
    border: 0;
  }

  .login-bar .el-button.el-button--primary {
    width: 100%;
  }

  .el-input-group__append img {
    cursor: pointer;
  }
</style>
