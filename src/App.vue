<template>
  <div id="app">
    <header>
      <!-- <h1>Hello App</h1>
      <nav>
        <router-link to="/home">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/show">Show</router-link>
      </nav> -->
      <nav>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">首页</el-menu-item>
          <el-menu-item index="1">帖子</el-menu-item>
          <el-menu-item index="2">发现</el-menu-item>
          <el-menu-item index="3">登录</el-menu-item>
          <el-menu-item index="4">注册</el-menu-item>
        </el-menu>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          '/home',
          '/posts',
          '/explore',
          '/login',
          '/register',
        ],
      };
    },
    computed: {
      activeIndex() {
        return `${this.links.indexOf(this.$route.path)}`;
      },
    },
    methods: {
      handleSelect(key) {
        this.$router.push(this.links[key]);
      },
    },
  };
</script>

<style>
  a {
    text-decoration: none;
  }

  /*.router-link-active {
    color: #000;
    font-weight: bolder;
  }*/

  nav a {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
