<template>
  <div>
    <login-bar></login-bar>
  </div>
</template>

<script>
  import LoginBar from '../components/LoginBar.vue';

  export default {
    name: 'home',
    components: {
      LoginBar,
    },
  };
</script>
