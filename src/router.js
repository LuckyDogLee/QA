import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import Posts from './pages/Posts.vue';
import Explore from './pages/Explore.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Question from './pages/Question.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/home', component: Home },
    { path: '/posts', component: Posts },
    { path: '/explore', component: Explore },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/question', component: Question },
  ],
});
