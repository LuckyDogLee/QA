<template>
  <div class="question-detail">
    <el-tag
      type="info"
      v-for="lable in question.lableDOList"
      :key="lable.id">{{ lable.name }}
    </el-tag>
    <p>{{ question.title }}</p>
    <p>{{ question.content }}</p>
    <el-input
      type="textarea"
      :autosize="{ minRows: 3 }"
      placeholder="请输入回答内容"
      v-model="answerStr">
    </el-input>
    <div class="btn-container">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="small"
        @click="addAnswer">添加回答
      </el-button>
    </div>
    <p v-for="answer in answers" class="answer">
      <el-tag>{{ answer.consentNum }}</el-tag>
      <el-button
        type="primary"
        icon="el-icon-caret-top"
        @click="like(answer.id)"
        size="mini">支持</el-button>
      <el-button
        type="primary"
        icon="el-icon-caret-bottom"
        @click="dislike(answer.id)"
        size="mini">反对</el-button>
      <span class="answerStr">{{ answer.answerStr }}</span>
    </p>
  </div>
</template>

<script>
  import {
    apiQueryQuestion,
    apiQueryAnswer,
    apiConsent,
    apiAddAnswer,
  } from '../api';

  export default {
    data() {
      return {
        answerStr: '',
        question: {
          id: '',
          title: '',
          content: '',
          createTime: '',
          lableDOList: [],
          answerDOList: [],
        },
        answers: [],
      };
    },
    methods: {
      like(id) {
        this.consent(id, true);
      },
      dislike(id) {
        this.consent(id, false);
      },
      getAnswer() {
        apiQueryAnswer(this.$route.params.id, 1).then((response) => {
          response.text().then((data) => {
            const responseBody = JSON.parse(data);
            const answers = responseBody.content;
            answers.forEach((answer) => {
              this.answers.push(answer);
            });
          });
        }, (error) => {
          console.log(error.message);
        });
      },
      consent(id, isConsent) {
        apiConsent(id, isConsent).then((response) => {
          response.text().then((data) => {
            const responseCode = JSON.parse(data).responseCode;
            if (responseCode === '00') {
              this.answers = [];
              this.getAnswer();
            } else if (responseCode === '200007') {
              this.$router.push('/login');
            } else {
              const msg = JSON.parse(data).responseMsg;
              console.log(msg);
            }
          });
        }, (error) => {
          console.log(error.message);
        });
      },
      addAnswer() {
        apiAddAnswer(this.question.id, this.answerStr).then((response) => {
          response.text().then((data) => {
            const responseCode = JSON.parse(data).responseCode;
            if (responseCode === '00') {
              this.answerStr = '';
              this.answers = [];
              this.getAnswer();
            } else if (responseCode === '200007') {
              this.$router.push('/login');
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
      apiQueryQuestion(1, true).then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const questions = responseBody.content;
          questions.forEach((question) => {
            if (parseInt(this.$route.params.id, 10) === question.id) {
              this.question.id = question.id;
              this.question.title = question.abstractInfo;
              this.question.content = question.detailInfo;
              this.question.createTime = question.createTime;
              this.question.lableDOList = question.lableDOList;
              this.question.answerDOList = question.answerDOList;
            }
          });
        });
      }, (error) => {
        console.log(error.message);
      });

      this.getAnswer();
    },
  };
</script>

<style>
  .question-detail {
    padding: 15px 10px; 
  }

  .btn-container {
    margin: 10px 0;
    text-align: right;
  }

  .el-tag--info {
    margin-right: 10px;
  }

  .answer > button {
    margin-left: 10px;
  }

  .answerStr {
    display: block;
    margin: 10px 0;
  }
</style>
