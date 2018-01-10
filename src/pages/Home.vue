<template>
  <div id="home">
    <li
      class="question-item"
      v-for="question in questions"
      @click="$router.push(`/question/${question.id}`)"
    >
      <span>{{ question.title }}</span>
      <footer>
        <time :datetime="question.createTime">
          {{ question.createTime }}
        </time>
        &nbsp&nbsp
        <span><i>{{ question.answerCount }}</i>回答</span>
      </footer>
    </li>
  </div>
</template>

<script>
  import { apiQueryQuestion } from '../api';

  export default {
    data() {
      return {
        questions: [],
      };
    },
    methods: {
    },
    created() {
      apiQueryQuestion(1, true).then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const questions = responseBody.content;
          questions.forEach((question) => {
            this.questions.push({
              id: question.id,
              title: question.abstractInfo,
              createTime: question.createTime.split(' ')[0],
              answerCount: question.answerCount,
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
  #home .question-item {
    padding: 10px;
    border-bottom: 1px solid #d3d3d3;
    list-style: none;
  }

  #home .question-item > span {
    font-weight: bolder;
  }

  #home .question-item footer {
    font-weight: lighter;
    margin-top: 5px;
    color: gray;
    text-align: right;
  }
</style>

