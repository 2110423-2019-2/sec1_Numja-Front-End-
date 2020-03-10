import { StoreOptions } from "vuex";
import {
  LoginState,
  LoginGetters,
  LoginMutations,
  LoginActions,
  LoginCredentials,
  User
} from "@/types";
import Vue from "vue";
import router from "../../router";

const store: StoreOptions<LoginState> = {
  state: {
    fetching: false,
    error: false,
    token: null,
    user: null
  },
  getters: {
    [LoginGetters.isLogin]: state => !!state.token,
    [LoginGetters.isFetching]: state => state.fetching
  },
  mutations: {
    [LoginMutations.setToken]: (state, payload: string) => {
      state.token = payload;
    },
    [LoginMutations.setFetching]: (state, payload: boolean) => {
      state.fetching = payload;
    },
    [LoginMutations.setUser]: (state, payload: User) => {
      state.user = payload;
    }
  },
  actions: {
    [LoginActions.login]: async (
      { commit, dispatch },
      payload: LoginCredentials
    ) => {
      commit(LoginMutations.setFetching, true);
      const response = await Vue.axios.post<string>("/auth/login", payload);
      if (response.status === 201) {
        commit(LoginMutations.setToken, response.data);
        commit(LoginMutations.setError, false);
        dispatch(LoginActions.redirect);
      } else {
        commit(LoginMutations.setError, true);
      }
    },
    [LoginActions.logout]: async ({ commit }) => {
      commit(LoginMutations.setUser, null);
      commit(LoginMutations.setToken, null);
      router.push("/");
    },
    [LoginActions.redirect]: async ({ commit, state }) => {
      const response = await Vue.axios.get<User>("/user/me", {
        headers: { authorization: `Bearer ${state.token}` }
      });
      if (response.status === 200) {
        commit(LoginMutations.setUser, response.data);
        router.push("/");
      }
      commit(LoginMutations.setFetching, false);
    }
  }
};

export default store;
