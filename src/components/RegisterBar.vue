<template>
  <div class="register-bar">
    <header>
      <h1>加入呵呵问答</h1>
      <p>在呵呵问答分享你的知识、经验和见解</p>
    </header>
    <el-input
      placeholder="用户名"
      v-model="accountName"
      type="text"
      clearable>
    </el-input>
    <el-input
      placeholder="邮箱"
      v-model="email"
      type="email"
      clearable>
    </el-input>
    <div class="sex">
      <el-radio v-model="sex" label="1" border>男</el-radio>
      <el-radio v-model="sex" label="0" border>女</el-radio>
    </div>
    <el-input
      placeholder="学号"
      v-model="studentId"
      type="text"
      clearable>
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
      studentId: '',
      password: '',
      msg: '',
      msgType: '',
      sex: '1',
    }),
    methods: {
      checkEmail(email) {
        return /\w+[@]\w+[.]\w+/.test(email);
      },
      checkStudentId(studentId) {
        return /\d{13}/.test(studentId);
      },
      register() {
        if (this.accountName !== '' && this.email !== '' && this.password !== '') {
          if (!this.checkEmail(this.email)) {
            this.msg = '邮箱格式有误';
            this.msgType = 'error';
            return;
          }

          if (!this.checkStudentId(this.studentId)) {
            this.msg = '请输入13位数字学号';
            this.msgType = 'error';
            return;
          }

          apiRegister(
            this.accountName,
            this.email,
            this.studentId,
            this.password,
            this.sex,
          ).then((response) => {
            response.text().then((data) => {
              const responseCode = JSON.parse(data).responseCode;
              if (responseCode === '00') {
                this.msg = '恭喜您注册成功';
                this.msgType = 'success';
                setTimeout(() => {
                  this.$router.push('/login');
                }, 1000);
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
  
  .sex,
  .register-bar .el-input,
  .register-bar .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  .register-bar .el-button.el-button--primary {
    width: 100%;
  }

  .sex {
    display: flex;
  }

  .sex .el-radio {
    width: 30%;
    flex-grow: 1;
  }
</style>
