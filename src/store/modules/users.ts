import Vue from "vue";
import vueStore from "../index";
import { StoreOptions } from "vuex";
import {
  UsersState,
  UsersActions,
  UsersMutations,
  UsersGetters,
  User,
  UserRole
} from "@/types";

const store: StoreOptions<UsersState> = {
  state: {
    users: [],
    isError: false,
    isFetching: false,
    isSuccess: false
  },

  getters: {
    [UsersGetters.getUsers]: state => state.users,
    [UsersGetters.getTutors]: state => {
      return state.users.filter(user => user.role === UserRole.Tutor);
    },
    [UsersGetters.getOtherUsers]: state => {
      return state.users.filter(
        user => user._id !== vueStore.getters.getUser._id
      );
    },
    [UsersGetters.getUserById]: state => (id: string) => {
      return state.users.find(user => user._id === id);
    },
    [UsersGetters.getNonAdminUsers]: state =>
      state.users.filter(user => user.role !== UserRole.Admin)
  },

  mutations: {
    [UsersMutations.setUsers]: (state: UsersState, users: User[] | []) => {
      state.users = users;
    }
  },

  actions: {
    [UsersActions.fetchUsers]: async ({ commit }) => {
      try {
        const response = await Vue.axios.get("/user");
        const responseData: User[] = response.data;
        commit(UsersMutations.setUsers, responseData);
      } catch (error) {
        console.log(error);
      }
    },
    [UsersActions.uploadPortfolio]: async ({ commit, getters }, payload) => {
      const user = getters.getUser;
      try {
        const response = await Vue.axios.post(
          `user/${user.id}/portfolio/upload`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default store;
