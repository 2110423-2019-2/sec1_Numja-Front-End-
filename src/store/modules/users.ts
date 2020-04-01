import Vue from "vue";
import vueStore from "../index";
import { StoreOptions } from "vuex";
import {
  UsersState,
  UsersActions,
  UsersMutations,
  UsersGetters,
  User,
  UserRole,
  SnackbarActions
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
    [UsersActions.fetchUsers]: async ({ commit, dispatch }) => {
      try {
        const response = await Vue.axios.get("/user");
        const responseData: User[] = response.data;
        commit(UsersMutations.setUsers, responseData);
      } catch {
        dispatch(SnackbarActions.push, {
          color: 'error',
          message: 'Users fetching failed'
        });
      }
    },
    [UsersActions.uploadPortfolio]: async (
      { commit, getters, dispatch },
      payload
    ) => {
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
        dispatch(SnackbarActions.push, {
          color: "success",
          message: "Portfolio uploaded"
        });
      } catch {
        dispatch(SnackbarActions.push, {
          color: "error",
          message: "Upload failed"
        });
      }
    }
  }
};

export default store;
