import Vue from "vue";
import { StoreOptions } from "vuex";
import {
  SuspendActions,
  SuspendGetters,
  SuspendMutations,
  SuspendState,
  SuspendUserPayload,
  UserRole
} from "@/types";

const store: StoreOptions<SuspendState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    users: []
  },

  getters: {
    [SuspendGetters.getUsers]: state =>
      state.users.filter(user => user.role !== UserRole.Admin)
  },

  mutations: {
    [SuspendMutations.setUsers]: (state, users) => {
      state.users = users;
    },
    [SuspendMutations.fetching]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [SuspendMutations.success]: (state) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
    },
    [SuspendMutations.error]: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
    }
  },

  actions: {
    [SuspendActions.fetchUsers]: async ({ commit }) => {
      commit(SuspendMutations.fetching);
      try {
        const response = await Vue.axios.get("/user");
        commit(SuspendMutations.setUsers, response.data);
        commit(SuspendMutations.success);
      } catch {
        commit(SuspendMutations.error);
      }
    },
    [SuspendActions.suspend]: async (
      { commit, dispatch },
      { id }: SuspendUserPayload
    ) => {
      try {
        await Vue.axios.patch("/admin/suspend", { userId: id });
        dispatch(SuspendActions.fetchUsers);
      } catch {
        commit(SuspendMutations.error);
      }
    },
    [SuspendActions.activate]: async (
      { commit, dispatch },
      { id }: SuspendUserPayload
    ) => {
      try {
        await Vue.axios.patch("/admin/activate", { userId: id });
        dispatch(SuspendActions.fetchUsers);
      } catch {
        commit(SuspendMutations.error);
      }
    }
  }
};

export default store;
