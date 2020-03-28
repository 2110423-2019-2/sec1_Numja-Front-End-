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
    appointments: []
  },

  getters: {
    [AppointmentGetters.getTutors]: state => {
      return state.tutors;
    },
    [AppointmentGetters.getAppointments]: state => {
      return state.appointments;
    }
  },

  mutations: {
    [AppointmentMutations.setTutors]: (state, tutors) => {
      state.tutors = tutors;
    },
    [AppointmentMutations.setAppointments]: (state, appointments) => {
      state.appointments = appointments;
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
    [AppointmentActions.fetchAppointments]: async ({ commit }) => {
      commit(AppointmentMutations.fetching);
      try {
        const response = await Vue.axios.get('/appointment/me');
        commit(AppointmentMutations.setAppointments, response.data);
      } catch (error) {
        //
      }
    }
  }
};

export default store;
