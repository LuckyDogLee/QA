<template>
  <div id="question">
    <el-input
      type="textarea"
      autosize
      placeholder="请输入标题"
      v-model="title">
    </el-input>
    <el-input
      type="textarea"
      :autosize="{ minRows: 6 }"
      placeholder="添加问题的补充说明..."
      v-model="content">
    </el-input>
    <el-button type="primary" @click="question">发布问题</el-button>
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
  export default {
    data() {
      return {
        title: '',
        content: '',
        msg: '',
        msgType: '',
      };
    },
    methods: {
      question() {
        if (this.title !== '' && this.content !== '') {
          // apiRegister(this.accountName, this.email, this.password).then((response) => {
          //   response.text().then((data) => {
          //     const responseCode = JSON.parse(data).responseCode;
          //     if (responseCode === '00') {
          //       this.msg = '恭喜您提问成功';
          //       this.msgType = 'success';
          //     } else {
          //       this.msg = JSON.parse(data).responseMsg;
          //       this.msgType = 'error';
          //     }
          //   });
          // }, (error) => {
          //   console.log(error.message);
          // });

          this.msg = '恭喜您提问成功';
          this.msgType = 'success';
          this.title = '';
          this.content = '';
        } else {
          this.msg = '请将信息填写完整';
          this.msgType = 'error';
        }
      },
    },
  };
</script>

<style>
  #question {
    padding: 10px;
  }

  #question .el-textarea,
  #question .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  #question .el-button.el-button--primary {
    width: 100%;
  }
</style>
