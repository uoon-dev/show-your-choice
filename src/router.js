import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddQuestions from './views/AddQuestions.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        next('/question/add')
      }
    },
    {
      path: '/question/add',
      name: 'addQuestion',
      component: AddQuestions
    },
    {
      path: '/question/show',
      name: 'showQuestions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ShowQuestions.vue'),
    }
  ],
});
