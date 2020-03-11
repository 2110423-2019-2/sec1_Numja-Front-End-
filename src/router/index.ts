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
  maintenanceRouter
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
