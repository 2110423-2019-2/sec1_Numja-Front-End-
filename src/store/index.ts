import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import chat from "@/store/modules/chat";
import chats from "@/store/modules/chats";
import login from "@/store/modules/login";
import snackbar from "@/store/modules/snackbar";
import suspendUser from "@/store/modules/maintenance/suspend";
import appointment from "@/store/modules/appointment";
import verify from "@/store/modules/maintenance/verify";
import users from "@/store/modules/users";
import { LoginState } from "@/types";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<LoginState>({
  storage: window.localStorage,
  modules: ["login"]
});

const store = new Vuex.Store<any>({
  modules: {
    chat,
    chats,
    login,
    snackbar,
    suspendUser,
    appointment,
    verify,
    users
  },
  plugins: [vuexLocal.plugin]
});

export default store;
