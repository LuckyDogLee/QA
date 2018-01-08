<template>
  <div>
    <login-bar></login-bar>
  </div>
</template>

<script>
  import LoginBar from '../components/LoginBar.vue';

  export default {
    name: 'login',
    components: {
      LoginBar,
    },
  };
</script>
