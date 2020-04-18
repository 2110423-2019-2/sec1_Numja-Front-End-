import { StoreOptions } from 'vuex';
import {
  LoginState,
  LoginGetters,
  LoginMutations,
  LoginActions,
  LoginCredentials,
  SignUpCredentials,
  User,
} from '@/types';
import Vue from 'vue';
import router from '../../router';

const store: StoreOptions<LoginState> = {
  state: {
    fetchingLogin: false,
    error: false,
    token: null,
    user: null,
    errorMessage: '',
  },
  getters: {
    [LoginGetters.isLogin]: (state) => !!state.token,
    [LoginGetters.isFetchingLogin]: (state) => state.fetchingLogin,
    [LoginGetters.getUser]: (state) => state.user,
    [LoginGetters.getError]: (state) => state.error,
    [LoginGetters.getErrorMessage]: (state) => state.errorMessage,
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
    [LoginMutations.setErrorMessage]: (state, payload: string) => {
      state.errorMessage = payload;
    },
    [LoginMutations.setUser]: (state, payload: User) => {
      state.user = payload;
    },
  },
  actions: {
    [LoginActions.login]: async (
      { commit, dispatch },
      payload: LoginCredentials
    ) => {
      commit(LoginMutations.setFetchingLogin, true);
      const response = await Vue.axios.post<string>('/auth/login', payload);
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

      try {
        const response = await Vue.axios.post<string>(
          '/auth/register',
          payload
        );
        if (response.status === 201) {
          commit(LoginMutations.setToken, response.data);
          dispatch(LoginActions.setAxiosHeader);
          commit(LoginMutations.setError, false);
          dispatch(LoginActions.redirect);
        } else {
          throw new Error();
        }
      } catch (error) {
        commit(LoginMutations.setError, true);

        if (error.toString().includes('400')) {
          commit(LoginMutations.setErrorMessage, 'username is already taken');
        } else if (error.toString().includes('500')) {
          commit(LoginMutations.setErrorMessage, 'email is already taken');
        } else {
          commit(
            LoginMutations.setErrorMessage,
            'something is wrong with the server'
          );
        }
      }
    },
    [LoginActions.logout]: async ({ commit }) => {
      commit(LoginMutations.setUser, null);
      commit(LoginMutations.setToken, null);
      router.push('/login');
    },
    [LoginActions.redirect]: async ({ commit }) => {
      const response = await Vue.axios.get<User>('/user/me');
      if (response.status === 200) {
        commit(LoginMutations.setUser, response.data);
        router.push('/');
      }
      commit(LoginMutations.setFetchingLogin, false);
    },
    [LoginActions.setAxiosHeader]: ({ state }) => {
      if (state.token) {
        Vue.axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${state.token}`;
      }
    },
  },
};

export default store;
