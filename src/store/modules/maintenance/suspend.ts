import Vue from "vue";
import { StoreOptions } from "vuex";
import {
  SuspendState,
  SuspendActions,
  SuspendMutations,
  SuspendUserPayload,
  SuspendGetters
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
      state.users.map(user => {
        return {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status
        };
      })
  },

  mutations: {
    [SuspendMutations.setUsers]: (state, users) => {
      state.users = users;
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
    [SuspendActions.activate]: async ({ commit, dispatch }, { id }) => {
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
