import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import login from "@/store/modules/login";
import snackbar from "@/store/modules/snackbar";
import { State, LoginState } from "@/types";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<LoginState>({
  storage: window.localStorage,
  modules: ["login"]
});

export default new Vuex.Store<any>({
  modules: {
    login,
    snackbar
  },
  plugins: [vuexLocal.plugin]
});
