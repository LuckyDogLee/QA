<template>
  <div id="interest">
    <p>请选择您感兴趣的领域</p>
    <el-select v-model="values" multiple placeholder="请选择标签">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="interest">提交</el-button>
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
  import { apiQueryLable, apiInterestLable } from '../api';

  export default {
    data() {
      return {
        msg: '',
        msgType: '',
        options: [],
        values: [],
      };
    },
    methods: {
      interest() {
        const labels = this.values.join(',');
        if (labels !== '') {
          apiInterestLable(labels).then((response) => {
            response.text().then((data) => {
              const responseCode = JSON.parse(data).responseCode;
              if (responseCode === '00') {
                this.msg = '恭喜您选择成功';
                this.msgType = 'success';
                this.values = [];
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
  #interest {
    padding: 10px;
  }

  #interest > p {
    text-align: center;
  }

  #interest .el-select,
  #interest .el-button.el-button--primary {
    margin-bottom: 10px;
  }

  #interest .el-select,
  #interest .el-button.el-button--primary {
    width: 100%;
  }

  .el-scrollbar__view.el-select-dropdown__list {
    max-height: 182px;
    overflow: auto;
  }
</style>
