import { StoreOptions } from "vuex";
import {
  LoginState,
  LoginGetters,
  LoginMutations,
  LoginActions,
  LoginCredentials,
  SignUpCredentials,
  User
} from "@/types";
import Vue from "vue";
import router from "../../router";

const store: StoreOptions<LoginState> = {
  state: {
    fetchingLogin: false,
    error: false,
    token: null,
    user: null
  },
  getters: {
    [LoginGetters.isLogin]: state => !!state.token,
    [LoginGetters.isFetchingLogin]: state => state.fetchingLogin,
    [LoginGetters.getUser]: state => state.user
  },
  mutations: {
    [LoginMutations.setToken]: (state, payload: string) => {
      state.token = payload;
    },
    [LoginMutations.setFetchingLogin]: (state, payload: boolean) => {
      state.fetchingLogin = payload;
    },
    [LoginMutations.setError]: (state, payload: boolean) => {
      state.error = payload;
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
      commit(LoginMutations.setFetchingLogin, true);
      const response = await Vue.axios.post<string>("/auth/login", payload);
      if (response.status === 201) {
        commit(LoginMutations.setToken, response.data);
        dispatch(LoginActions.setAxiosHeader);
        commit(LoginMutations.setError, false);
        dispatch(LoginActions.redirect);
      } else {
        commit(LoginMutations.setError, true);
        commit(LoginMutations.setFetchingLogin, false);
      }
    },
    [LoginActions.signUp]: async (
      { commit, dispatch },
      payload: SignUpCredentials
    ) => {
      commit(LoginMutations.setFetchingLogin, true);
      const response = await Vue.axios.post<string>("/auth/register", payload);

      if (response.status === 201) {
        commit(LoginMutations.setToken, response.data);
        dispatch(LoginActions.setAxiosHeader);
        commit(LoginMutations.setError, false);
        dispatch(LoginActions.redirect);
      } else {
        commit(LoginMutations.setError, true);
        commit(LoginMutations.setFetchingLogin, false);
      }
    },
    [LoginActions.logout]: async ({ commit }) => {
      commit(LoginMutations.setUser, null);
      commit(LoginMutations.setToken, null);
      router.push("/login");
    },
    [LoginActions.redirect]: async ({ commit, state }) => {
      const response = await Vue.axios.get<User>("/user/me");
      if (response.status === 200) {
        commit(LoginMutations.setUser, response.data);
        router.push("/");
      }
      commit(LoginMutations.setFetchingLogin, false);
    },
    [LoginActions.setAxiosHeader]: ({ state }) => {
      if (state.token) {
        Vue.axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.token}`;
      }
    }
  }
};

export default store;
