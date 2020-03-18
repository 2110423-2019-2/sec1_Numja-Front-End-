import Vue from "vue";
import { StoreOptions } from "vuex";
import {
  VerifyState,
  VerifyActions,
  VerifyMutations,
  VerifyTutorPayload,
  VerifyGetters
} from "@/types";

const store: StoreOptions<VerifyState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    tutors: []
  },

//   getters: {
//     [VerifyGetters.getTutor]: state =>
//       state.tutors.map(tutor => {
//         return {
//           id: tutor._id,
//           username: tutor.username,
//           firstName: tutor.firstName,
//           lastName: tut.lastName,
//           status: user.status
//         };
//       })
//   },

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
    },
    [VerifyActions.verify]: async (
      { commit, dispatch },
      { id }: VerifyTutorPayload
    ) => {
      try {
        const response = await Vue.axios.post(`admin/verifyTutor/${id}`);
        // dispatch(VerifyActions.fetchTutors);
        commit(VerifyMutations.setTutors, response.data);
      } catch {
        commit(VerifyMutations.error);
      }
    },
    [VerifyActions.unverify]: async ({ commit, dispatch }, 
        { id }: VerifyTutorPayload
    ) => {
      try {
        const response = await Vue.axios.post(`admin/unverify/${id}`);
        dispatch(VerifyActions.fetchTutors);
      } catch {
        commit(VerifyMutations.error);
      }
    }
  }
};

export default store;
