<template>
  <div id="recommend">
    <section>
      <li
        class="recommend-user"
        v-for="user in users"
        @click="$router.push(`/user/${user.id}`)"
      >
        <span class="circle" :class="user.sex === 0 ? 'female' : 'men'">
          {{ user.accountName.charAt(0) }}
        </span>
        <span class="accountName">{{ user.accountName }}</span>
      </li>
    </section>
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
  import { apiRecommendQuestion, apiRecommendUser } from '../api';

  export default {
    data() {
      return {
        questions: [],
        users: [],
      };
    },
    methods: {
    },
    created() {
      apiRecommendQuestion().then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const questions = responseBody.content;
          questions.forEach((question) => {
            this.questions.push({
              id: question.id,
              title: question.detailInfo,
              createTime: question.createTime.split(' ')[0],
              answerCount: question.answerCount,
            });
          });
        });
      }, (error) => {
        console.log(error.message);
      });

      apiRecommendUser(4).then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const users = responseBody.content;
          const studentId = sessionStorage.getItem('studentId');

          users.forEach((user) => {
            if (studentId !== user.studentId) {
              this.users.push({
                id: user.id,
                accountName: user.accountName,
                sex: user.sex,
              });
            }
          });
        });
      }, (error) => {
        console.log(error.message);
      });
    },
  };
</script>

<style>
  #recommend .question-item {
    padding: 10px;
    border-bottom: 1px solid #d3d3d3;
    list-style: none;
  }

  #recommend .question-item > span {
    font-weight: bolder;
  }

  #recommend .question-item footer {
    font-weight: lighter;
    margin-top: 5px;
    color: gray;
    text-align: right;
  }

  #recommend > section {
    display: flex;
    width: 100%;
    height: 70px;
    padding: 10px;
    overflow-y: auto;
    border-bottom: 1px solid #d3d3d3;
  }

  #recommend > section > li {
    display: inline-block;
    list-style: none;
    text-align: center;
    padding: 0 5px;
  }

  #recommend .accountName {
    display: block;
    width: 50px;
    height: 18px;
    overflow: auto;
  } 

  .circle {
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    color: white;
  }

  .circle.men {
    background-color: #409eff;
  }

  .circle.female {
    background-color: pink;
  }

  .question-item,
  .recommend-user {
    cursor: pointer;
  }
</style>
