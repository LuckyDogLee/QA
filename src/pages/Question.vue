<template>
  <div id="question">
    <el-input
      type="textarea"
      autosize
      placeholder="请输入标题"
      v-model="title">
    </el-input>
    <el-select v-model="values" multiple placeholder="请选择标签">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
  import { apiQueryLable, apiAddQuestion } from '../api';

  export default {
    data() {
      return {
        title: '',
        content: '',
        msg: '',
        msgType: '',
        options: [],
        values: [],
      };
    },
    methods: {
      question() {
        const labels = this.values.join(',');
        if (this.title !== '' && this.content !== '' && labels !== '') {
          apiAddQuestion(this.title, this.content, labels).then((response) => {
            response.text().then((data) => {
              const responseCode = JSON.parse(data).responseCode;
              if (responseCode === '00') {
                this.msg = '恭喜您提问成功';
                this.msgType = 'success';
                this.title = '';
                this.values = [];
                this.content = '';
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
    created() {
      apiQueryLable().then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const labels = responseBody.content;
          labels.forEach((label) => {
            this.options.push({
              value: label.id,
              label: label.name,
            });
          });
        });
      }, (error) => {
        console.log(error.message);
      });
    },
  };
</script>

<style>
  #question {
    padding: 10px;
  }

  #question .el-textarea,
  #question .el-select,
  #question .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  #question .el-select,
  #question .el-button.el-button--primary {
    width: 100%;
  }

  .el-scrollbar__view.el-select-dropdown__list {
    max-height: 182px;
    overflow: auto;
  }
</style>
