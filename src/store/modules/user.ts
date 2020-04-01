import Vue from "vue";
import vueStore from "../index";
import { StoreOptions } from "vuex";
import {
  UserState,
  UserActions,
  UserMutations,
  UserGetters,
  User,
  UserRole,
  SuspendMutations
} from "@/types";

const store: StoreOptions<UserState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    users: []
  },

  getters: {
    [UserGetters.getUsers]: state => state.users,
    [UserGetters.getTutors]: state => {
      return state.users.filter(user => user.role === UserRole.Tutor);
    },
    [UserGetters.getOtherUsers]: state => {
      return state.users.filter(
        user => user._id !== vueStore.getters.getUser._id
      );
    },
    [UserGetters.getUserById]: state => (id: string) => {
      return state.users.find(user => user._id === id);
    },
    [UserGetters.getNonAdminUsers]: state =>
      state.users.filter(user => user.role !== UserRole.Admin)
  },

  mutations: {
    [UserMutations.setUsers]: (state: UserState, users: User[] | []) => {
      state.users = users;
    },
    [UserMutations.fetching]: state => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [UserMutations.success]: state => {
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
    },
    [UserMutations.error]: state => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    }
  },

  actions: {
    [UserActions.fetchUsers]: async ({ commit }) => {
      commit(UserMutations.fetching);
      try {
        const response = await Vue.axios.get("/user");
        const responseData: User[] = response.data;
        commit(UserMutations.setUsers, responseData);
        commit(UserMutations.success);
      } catch {
        commit(UserMutations.error);
      }
    },
    [UserActions.uploadPortfolio]: async ({ commit, getters }, payload) => {
      const user = getters.getUser;
      console.log(payload);
      try {
        const response = await Vue.axios.post(
          `/user/${user._id}/portfolio/upload`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } catch {
        commit(UserMutations.error);
      }
    }
  }
};

export default store;
