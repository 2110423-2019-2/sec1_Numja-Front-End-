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
    appointments: []
  },

  getters: {
    [AppointmentGetters.getAppointments]: state => {
      return state.appointments;
    }
  },

  mutations: {
    [AppointmentMutations.setAppointments]: (state, appointments) => {
      state.appointments = appointments;
    }
  },

  actions: {
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
