import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import Rank from './pages/Rank.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Recommend from './pages/Recommend.vue';
import More from './pages/More.vue';
import Question from './pages/Question.vue';
import Interest from './pages/Interest.vue';
import QuestionDetail from './pages/QuestionDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/Rank', component: Rank },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/recommend', component: Recommend },
    { path: '/more', component: More },
    { path: '/question', component: Question },
    { path: '/interest', component: Interest },
    { path: '/question/:id', component: QuestionDetail },
  ],
});
