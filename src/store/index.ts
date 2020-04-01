import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import chat from "@/store/modules/chat";
import login from "@/store/modules/login";
import snackbar from "@/store/modules/snackbar";
import suspendUser from "@/store/modules/maintenance/suspend";
import appointment from "@/store/modules/appointment";
import users from "@/store/modules/users";
import { State, LoginState } from "@/types";


Vue.use(Vuex);

const vuexLocal = new VuexPersistence<LoginState>({
  storage: window.localStorage,
  modules: ["login"]
});

const store = new Vuex.Store<any>({
  modules: {
    chat,
    login,
    snackbar,
    suspendUser,
    appointment,
    users
  },
  plugins: [vuexLocal.plugin]
});

export default store;
