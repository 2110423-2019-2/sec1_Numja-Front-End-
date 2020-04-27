import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { maintenanceRouter } from "@/router/maintenance-router";
import store from "@/store/modules/login";
import { LoginGetters } from "../types";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  {
    path: "/chat",
    name: "Chats",
    component: () =>
      import(/* webpackChunkName: "chats" */ "@/views/Chats.vue"),
    meta: { protected: true }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "sign-up" */ "@/views/SignUp.vue")
  },
  {
    path: "/profile/me",
    name: "ProfileMe",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
    meta: { protected: true }
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile-by-id" */ "@/views/ProfileById.vue"),
    meta: { protected: true }
  },
  {
    path: "/appointment",
    name: "Appointment",
    component: () =>
      import(/* webpackChunkName: "appointment" */ "@/views/Appointment.vue")
  },
  maintenanceRouter
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.protected && !store.getters![LoginGetters.isLogin]) {
    next("/login");
  } else {
    next();
  }
});

export default router;
