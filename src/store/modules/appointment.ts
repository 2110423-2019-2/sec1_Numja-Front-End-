import Vue from 'vue';
import vueStore from '../index';
import { StoreOptions } from 'vuex';
import {
  AppointmentPageState,
  AppointmentActions,
  AppointmentMutations,
  AppointmentGetters,
  AppointmentPayload,
  AppointmentPatchItem,
} from '@/types';

const store: StoreOptions<AppointmentPageState> = {
  state: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    appointments: [],
    selectedAppointmentId: '',
  },

  getters: {
    [AppointmentGetters.getAppointments]: (state) => {
      return state.appointments;
    },
  },

  mutations: {
    [AppointmentMutations.setAppointments]: (state, appointments) => {
      state.appointments = appointments;
    },
    [AppointmentMutations.setSelectedAppointmentId]: (state, id) => {
      state.selectedAppointmentId = id;
    },
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
    },
    [AppointmentActions.selectAppointment]: (
      { commit },
      payload: AppointmentPayload
    ) => {
      commit(AppointmentMutations.setSelectedAppointmentId, payload);
    },
    [AppointmentActions.acceptAppointment]: async ({
      commit,
      state,
      dispatch,
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/accept`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(AppointmentMutations.error);
      }
    },
    [AppointmentActions.rejectAppointment]: async ({
      commit,
      state,
      dispatch,
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/reject`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(AppointmentMutations.error);
      }
    },
    [AppointmentActions.finishAppointment]: async ({
      commit,
      state,
      dispatch,
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/finish`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(AppointmentMutations.error);
      }
    },
    [AppointmentActions.cancelAppointment]: async ({
      commit,
      state,
      dispatch,
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/${vueStore.getters.getUser.role}/cancel`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(AppointmentMutations.error);
      }
    },
    [AppointmentActions.editAppointment]: async (
      { commit, dispatch, state },
      payload: AppointmentPatchItem
    ) => {
      console.log('payload', payload);
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/edit`,
          payload
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(AppointmentMutations.error);
      }
    },
  },
};

export default store;
