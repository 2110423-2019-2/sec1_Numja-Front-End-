import Vue from 'vue';
import vueStore from '../index';
import { StoreOptions } from 'vuex';
import {
  UsersState,
  UsersActions,
  UsersMutations,
  UsersGetters,
  User,
  UserRole
} from '@/types';

const store: StoreOptions<UsersState> = {
  state: {
    users: []
  },

  getters: {
    [UsersGetters.getUsers]: state => state.users,
    [UsersGetters.getTutors]: state =>
      state.users.filter(user => user.role === UserRole.Tutor),
    [UsersGetters.getOtherUsers]: state => {
      return state.users.filter(
        user => user._id !== vueStore.getters.getUser._id
      );
    },
    [UsersGetters.getUserById]: state => (id: string) => {
      return state.users.find(user => user._id === id);
    }
  },

  mutations: {
    [UsersMutations.setUsers]: (state: UsersState, users: User[] | []) => {
      state.users = users;
    }
  },

  actions: {
    [UsersActions.fetchUsers]: async ({ commit }) => {
      try {
        const response = await Vue.axios.get('/user');
        const responseData: User[] = response.data;
        commit(UsersMutations.setUsers, responseData);
      } catch (error) {
        //
      }
    },
    [UsersActions.test]: ({ commit }) => {
      console.log('test user action');
      console.log(vueStore.getters.getUser);
    }
  }
};

export default store;
