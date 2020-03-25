import Vue from 'vue';
import { StoreOptions } from 'vuex';
import {
  tutorListPageState,
  tutorListActions,
  tutorListMutations,
  tutorListGetters,
  User,
  UserRole
} from '@/types';

const store: StoreOptions<tutorListState> = {
  state: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    tutors: []
  },

  getters: {
    [tutorListGetters.getTutors]: state => {
      console.log('getters', state.tutors);
      return state.tutors;
    }
  },

  mutations: {
    [AppointmentMutations.setTutors]: (state, tutors) => {
      state.tutors = tutors;
    }
  },

  actions: {
    [tutorListActions.fetchTutors]: async ({ commit }) => {
      commit(AppointmentMutations.fetching);
      try {
        const response = await Vue.axios.get('/user');
        const responseData: User[] = response.data;
        commit(
          AppointmentMutations.setTutors,
          responseData.filter(user => user.role === UserRole.Tutor)
        );
      } catch (error) {
        //
      }
    }
  }
};

export default store;
