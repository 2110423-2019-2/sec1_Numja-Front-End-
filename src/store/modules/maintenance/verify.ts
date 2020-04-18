import Vue from "vue";
import { StoreOptions } from "vuex";
import { VerifyState, VerifyActions, VerifyMutations } from "@/types";

const store: StoreOptions<VerifyState> = {
  state: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    tutors: [],
    fileList: [],
  },

  mutations: {
    [VerifyMutations.setTutors]: (state, tutors) => {
      state.tutors = tutors;
    },
    [VerifyMutations.setFileList]: (state, fileList) => {
      state.fileList = fileList;
    },
    [VerifyMutations.fetching]: (state) => {
      state.isFetching = true
      state.isError = false
      state.isSuccess = false
    },
    [VerifyMutations.success]: (state) => {
      state.isFetching = false
      state.isError = false
      state.isSuccess = true    
    },
    [VerifyMutations.error]: (state) => {
      state.isFetching = false
      state.isError = true
      state.isSuccess = false    
    }
  },

  actions: {
    [VerifyActions.fetchTutors]: async ({ commit }) => {
      commit(VerifyMutations.fetching);
      try {
        const response = await Vue.axios.get("/admin/findTutors");
        commit(VerifyMutations.setTutors, response.data);
        commit(VerifyMutations.success);
      } catch {
        commit(VerifyMutations.error);
      }
    },
    [VerifyActions.fetchFileList]: async ({ commit }) => {
      commit(VerifyMutations.fetching);
      try {
        const response = await Vue.axios.get("/admin/portfolio/list");
        commit(VerifyMutations.setFileList, response.data);
        commit(VerifyMutations.success);
      } catch {
        commit(VerifyMutations.error);
      }
    }
  }
};

export default store;
