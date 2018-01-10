<template>
  <div id="more">
    <p>个人主页</p>
    <el-form :label-position="labelPosition" label-width="40px" :model="formLabelAlign">
      <el-form-item label="昵称">
        <el-input v-model="formLabelAlign.accountName" :disabled="!editable"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formLabelAlign.studentId" :disabled="!editable"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.email" :disabled="!editable"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="logout" plain>退出帐号</el-button>
  </div>
</template>

<script>
  import { apiQueryMe, apiLogout } from '../api';

  export default {
    data() {
      return {
        editable: false,
        labelPosition: 'right',
        formLabelAlign: {
          accountName: '',
          studentId: '',
          email: '',
        },
      };
    },
    methods: {
      logout() {
        apiLogout().then((response) => {
          response.text().then((data) => {
            const responseCode = JSON.parse(data).responseCode;
            if (responseCode === '00') {
              window.bus.$emit('logout');
              this.$router.push('/home');
            } else {
              const msg = JSON.parse(data).responseMsg;
              console.log(msg);
            }
          });
        }, (error) => {
          console.log(error.message);
        });
      },
    },
    created() {
      apiQueryMe().then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const myInfo = responseBody.content;
          this.formLabelAlign.accountName = myInfo.account;
          this.formLabelAlign.studentId = myInfo.studentId;
          this.formLabelAlign.email = myInfo.email;
        });
      }, (error) => {
        console.log(error.message);
      });
    },
  };
</script>

<style>
  #more {
    padding: 10px;
  }

  #more > p {
    text-align: center;
  }

  #more .el-button {
    width: 100%;
  }
</style>
