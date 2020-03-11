import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { maintenanceRouter } from '@/views/maintenance/maintenance-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/SignUp.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Profile.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
