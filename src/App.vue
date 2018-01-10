<template>
  <div id="app">
    <header>
      <nav>
        <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
          <el-menu-item index="/home">
            <el-button type="text" icon="el-icon-document">首页</el-button>
          </el-menu-item>
          <el-menu-item index="/rank">
            <el-button type="text" icon="el-icon-star-off">热榜</el-button>
          </el-menu-item>
          <template v-if="!logined">
            <el-menu-item index="/login">
              <el-button type="text" icon="el-icon-printer">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text" icon="el-icon-edit-outline">注册</el-button>
            </el-menu-item>
          </template>
          <template v-else>
            <el-menu-item index="/recommend">
              <el-button type="text" icon="el-icon-search">推荐</el-button>
            </el-menu-item>
            <el-menu-item index="/more">
              <el-button type="text" icon="el-icon-more">更多</el-button>
            </el-menu-item>
          </template>
        </el-menu>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="logined && noneQuestionPaths.indexOf($route.path) === -1">
      <el-button type="primary" icon="el-icon-edit" round @click="$router.push('/question')">提问</el-button>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logined: false,
        authPaths: ['/question', '/recommend', '/interest', '/more'],
        noneQuestionPaths: ['/question', '/interest', '/more'],
      };
    },
    computed: {
      activeIndex() {
        return this.$route.path;
      },
    },
    methods: {
    },
    created() {
      window.bus.$on('login', () => {
        this.logined = true;
      });

      window.bus.$on('logout', () => {
        this.logined = false;
      });

      if (this.authPaths.indexOf(this.$route.path) !== -1 && !this.logined) {
        this.$router.push('/login');
      }
    },
    updated() {
      if (this.$route.path === '/question' && !this.logined) {
        this.$router.push('/login');
      }
    },
  };
</script>

<style>
  html {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  header nav a {
    text-decoration: none;
  }

  nav a {
    display: block;
    width: 100%;
    height: 100%;
  }

  #app > header,
  #app > main,
  #app > footer {
    position: fixed;
    right: 0;
    left: 0;
  }

  #app > header {
    top: 0;
  }

  #app > main {
    top: 61px;
    bottom: 0;
    overflow: auto;
  }

  #app > footer {
    bottom: 10px;
    z-index: 999;

    display: flex;
    justify-content: center;
  }

  .el-menu {
    display: flex;
    overflow-x: auto;
  }

  .el-menu-item {
    text-align: center;
    flex-grow: 1;
  }

  .el-menu-item,
  .el-submenu__title {
    padding: 0 10px;
  }

  .el-menu-item [class^=el-icon-] {
    margin-right: 0;
  }
</style>
