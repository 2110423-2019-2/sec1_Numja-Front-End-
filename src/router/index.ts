import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { maintenanceRouter } from "@/router/maintenance-router";

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
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "sign-up" */ "@/views/SignUp.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/Profile.vue")
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile-by-id" */ "@/views/ProfileById.vue")
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

export default router;
