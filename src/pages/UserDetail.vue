<template>
  <div id="user-detail">
    <p>
      <span class="circle" :class="formLabelAlign.sex === 0 ? 'female' : 'men'">
        {{ formLabelAlign.accountName.charAt(0) }}
      </span>
    </p>
    <el-form :label-position="labelPosition" label-width="40px" :model="formLabelAlign">
      <el-form-item label="昵称">
        <el-input v-model="formLabelAlign.accountName" :disabled="!editable"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input
          v-model="formLabelAlign.sex === 0 ? '女' : '男'"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formLabelAlign.studentId" :disabled="!editable"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { apiRecommendUser } from '../api';

  export default {
    data() {
      return {
        editable: false,
        labelPosition: 'right',
        formLabelAlign: {
          accountName: '',
          studentId: '',
          sex: 1,
        },
      };
    },
    methods: {
    },
    created() {
      apiRecommendUser(4).then((response) => {
        response.text().then((data) => {
          const responseBody = JSON.parse(data);
          const users = responseBody.content;
          const userId = parseInt(this.$route.params.id, 10);

          users.forEach((user) => {
            if (userId === user.id) {
              this.formLabelAlign.accountName = user.accountName;
              this.formLabelAlign.studentId = user.studentId;
              this.formLabelAlign.sex = user.sex;
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
  #user-detail {
    padding: 10px;
  }

  #user-detail .circle {
    margin: 0 auto;
  }
</style>
