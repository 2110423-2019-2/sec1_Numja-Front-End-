import Vue from "vue";
import { StoreOptions } from "vuex";
import { VerifyState, VerifyActions, VerifyMutations } from "@/types";

const store: StoreOptions<VerifyState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    tutors: []
  },

  mutations: {
    [VerifyMutations.setTutors]: (state, tutors) => {
      state.tutors = tutors;
    }
  },

  actions: {
    [VerifyActions.fetchTutors]: async ({ commit }) => {
      commit(VerifyMutations.fetching);
      try {
        const response = await Vue.axios.get("/admin/allTutor");
        commit(VerifyMutations.setTutors, response.data);
        commit(VerifyMutations.success);
      } catch {
        commit(VerifyMutations.error);
      }
    }
  }
};

export default store;
