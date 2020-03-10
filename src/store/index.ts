import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import login from "@/store/modules/login";
import { State, LoginState } from "@/types";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<LoginState>({
  storage: window.localStorage,
  modules: ["login"]
});

export default new Vuex.Store<State>({
  modules: {
    login
  },
  plugins: [vuexLocal.plugin]
});
