<template>
  <div id="app">
    <header>
      <nav>
        <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
          <el-menu-item index="/home">
            <el-button type="text" :icon="logined ? 'el-icon-document' : ''">首页</el-button>
          </el-menu-item>
          <el-menu-item index="/posts">
            <el-button type="text" :icon="logined ? 'el-icon-view' : ''">帖子</el-button>
          </el-menu-item>
          <el-menu-item index="/explore">
            <el-button type="text" :icon="logined ? 'el-icon-search' : ''">发现</el-button>
          </el-menu-item>
          <template v-if="!logined">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>
          <el-menu-item v-else index="/more">
            <el-button type="text" icon="el-icon-more">更多</el-button>
          </el-menu-item>
        </el-menu>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="logined && $route.path !== '/question'">
      <el-button type="primary" icon="el-icon-edit" round @click="$router.push('/question')">提问</el-button>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logined: false,
      };
    },
    computed: {
      activeIndex() {
        return `${this.$route.path}`;
      },
    },
    methods: {
    },
    created() {
      window.bus.$on('login', () => {
        this.logined = true;
      });
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

  #app > footer {
    width: 100%;
    position: fixed;
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
