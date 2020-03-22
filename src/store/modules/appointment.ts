import Vue from 'vue';
import { StoreOptions } from 'vuex';
import {
  AppointmentPageState,
  AppointmentActions,
  AppointmentMutations,
  AppointmentGetters,
  User,
  UserRole
} from '@/types';

const store: StoreOptions<AppointmentPageState> = {
  state: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    tutors: [],
    selectedTutorIndex: 0,
    isShowingPopUp: false
  },

  getters: {
    [AppointmentGetters.getTutors]: state => {
      console.log('getters', state.tutors);
      return state.tutors;
    }
  },

  mutations: {
    [AppointmentMutations.setTutors]: (state, tutors) => {
      state.tutors = tutors;
    },
    [AppointmentMutations.setSelectedIndex]: (state, index: number) => {
      state.selectedTutorIndex = index;
    },
    [AppointmentMutations.setShowPopUp]: (state, show) => {
      state.isShowingPopUp = show;
    }
  },

  actions: {
    [AppointmentActions.fetchTutors]: async ({ commit }) => {
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
    },
    [AppointmentActions.showTutorPopUp]: ({ commit }, { index }) => {
      commit(AppointmentMutations.setSelectedIndex, index);
      commit(AppointmentMutations.setShowPopUp, true);
    },
    [AppointmentActions.hideTutorPopUp]: ({ commit }) => {
      commit(AppointmentMutations.setShowPopUp, false);
    }
  }
};

export default store;
