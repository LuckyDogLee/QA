<template>
  <div id="rank">
    <li
      class="question-item"
      v-for="(question, index) in questions"
      @click="$router.push(`/question/${question.id}`)"
    >
      <div class="question-rank">
        <span class="question-rank-number">{{ index + 1 }}</span>
      </div>
      <div class="question-info">
        <span>{{ question.title }}</span>
        <footer>
          <time :datetime="question.createTime">
            {{ question.createTime }}
          </time>
          &nbsp&nbsp
          <span><i>{{ question.answerCount }}</i>回答</span>
        </footer>
      </div>
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
      apiQueryQuestion(1, false).then((response) => {
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
  #rank .question-item {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #d3d3d3;
    list-style: none;
  }

  #rank .question-rank {
    width: 10%;
    text-align: center;
  }

  #rank .question-info {
    width: 90%;
    padding-right: 10px;
  }

  #rank .question-info > span {
    font-weight: bolder;
  }

  #rank .question-info footer {
    margin-top: 5px;
    color: gray;
    font-weight: lighter;
  }

  #rank .question-rank-number {
    color: palevioletred;
  }

  #rank .question-item:nth-child(1) .question-rank-number,
  #rank .question-item:nth-child(2) .question-rank-number,
  #rank .question-item:nth-child(3) .question-rank-number {
    color: red;
  }
</style>
