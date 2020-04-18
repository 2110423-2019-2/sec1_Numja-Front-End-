import Vue from "vue";
import vueStore from "../../index";
import { StoreOptions } from "vuex";
import {
  SnackbarActions,
  SuspendActions,
  SuspendMutations,
  SuspendState,
  User,
  UsersActions
} from "@/types";

const store: StoreOptions<SuspendState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    users: []
  },

  getters: {},

  mutations: {
    [SuspendMutations.setUsers]: (state, users) => {
      state.users = users;
    }
  },

  actions: {
    [SuspendActions.suspend]: async ({ commit, dispatch }, user: User) => {
      try {
        await Vue.axios.patch("/admin/suspend", { userId: user._id });
        dispatch(UsersActions.fetchUsers);
        dispatch(SnackbarActions.push, {
          color: "success",
          message: `User ${user.username} is suspended`
        });
      } catch {
        dispatch(SnackbarActions.push, {
          color: "error",
          message: `Suspend failed`
        });
      }
    },
    [SuspendActions.activate]: async ({ commit, dispatch }, user: User) => {
      try {
        await Vue.axios.patch("/admin/activate", { userId: user._id });
        dispatch(UsersActions.fetchUsers);
        dispatch(SnackbarActions.push, {
          color: "success",
          message: `User ${user.username} is activated`
        });
      } catch {
        dispatch(SnackbarActions.push, {
          color: "error",
          message: `Activate failed`
        });
      }
    }
  }
};

export default store;
