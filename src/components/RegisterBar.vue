<template>
  <div class="register-bar">
    <header>
      <h1>加入呵呵问答</h1>
      <p>在呵呵问答分享你的知识、经验和见解</p>
    </header>
    <el-input
      placeholder="用户名"
      v-model="accountName"
      type="email"
      clearable
      required>
    </el-input>
    <el-input
      placeholder="邮箱"
      v-model="email"
      type="email"
      clearable
      required>
    </el-input>
    <el-input
      placeholder="密码"
      v-model="password"
      type="password"
      clearable>
    </el-input>
    <el-button type="primary" @click="register">注册</el-button>
    <el-alert
      v-if="msg !== ''"
      :title="msg"
      :type="msgType"
      center
      show-icon>
    </el-alert>
  </div>
</template>

<script>
  import { apiRegister } from '../api';

  export default {
    name: 'register-bar',
    data: () => ({
      accountName: '',
      email: '',
      password: '',
      msg: '',
      msgType: '',
    }),
    methods: {
      register() {
        if (this.accountName !== '' && this.email !== '' && this.password !== '') {
          apiRegister(this.accountName, this.email, this.password).then((response) => {
            response.text().then((data) => {
              const responseCode = JSON.parse(data).responseCode;
              if (responseCode === '00') {
                // this.$router.push('/login');
                this.msg = '恭喜您注册成功';
                this.msgType = 'success';
              } else {
                this.msg = JSON.parse(data).responseMsg;
                this.msgType = 'error';
              }
            });
          }, (error) => {
            console.log(error.message);
          });
        } else {
          this.msg = '请将信息填写完整';
          this.msgType = 'error';
        }
      },
    },
  };
</script>

<style>
  .register-bar header * {
    text-align: center;
  }

  .register-bar h1 {
    font-size: 1.5em;
    margin: .6em 0;
  }

  .register-bar {
    margin: 10px;
  }
  
  .register-bar .el-input,
  .register-bar .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  .register-bar .el-button.el-button--primary {
    width: 100%;
  }
</style>
