import Vue from "vue";
import vueStore from "../../index";
import { StoreOptions } from "vuex";
import {
  SuspendActions,
  SuspendGetters,
  SuspendMutations,
  SuspendState,
  SuspendUserPayload,
  UserRole,
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
    [SuspendActions.suspend]: async (
      { commit, dispatch },
      { id }: SuspendUserPayload
    ) => {
      try {
        await Vue.axios.patch("/admin/suspend", { userId: id });
        dispatch(UsersActions.fetchUsers);
      } catch (e) {
        console.log(e);
      }
    },
    [SuspendActions.activate]: async (
      { commit, dispatch },
      { id }: SuspendUserPayload
    ) => {
      try {
        await Vue.axios.patch("/admin/activate", { userId: id });
        dispatch(UsersActions.fetchUsers);
      } catch (e) {
        console.log(e);
      }
    }
  }
};

export default store;
