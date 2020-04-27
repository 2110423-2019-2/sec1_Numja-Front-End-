import Vue from "vue";
import vueStore from "../index";
import { StoreOptions } from "vuex";
import {
  AppointmentPageState,
  AppointmentActions,
  AppointmentMutations,
  AppointmentGetters,
  AppointmentPayload,
  AppointmentPatchItem,
  UsersActions
} from "@/types";

const store: StoreOptions<AppointmentPageState> = {
  state: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    appointments: [],
    selectedAppointmentId: "",
    errorMessage: ""
  },

  getters: {
    [AppointmentGetters.getAppointments]: state => {
      return state.appointments;
    },
    [AppointmentGetters.getAppointmentError]: state => state.isError,
    [AppointmentGetters.getAppointmentErrorMessage]: state => state.errorMessage
  },

  mutations: {
    [AppointmentMutations.setAppointments]: (state, appointments) => {
      state.appointments = appointments;
    },
    [AppointmentMutations.setSelectedAppointmentId]: (state, id) => {
      state.selectedAppointmentId = id;
    },
    [AppointmentMutations.setAppointmentError]: (state, error: boolean) => {
      state.isError = error;
    },
    [AppointmentMutations.setAppointmentErrorMessage]: (
      state,
      message: string
    ) => {
      state.errorMessage = message;
    }
  },

  actions: {
    [AppointmentActions.fetchAppointments]: async ({ commit }) => {
      commit(AppointmentMutations.fetching);
      try {
        const response = await Vue.axios.get("/appointment/me");
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
      dispatch
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/accept`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(
          AppointmentMutations.setAppointmentErrorMessage,
          "something is wrong with the server"
        );
        commit(AppointmentMutations.setAppointmentError, true);
      }
      await vueStore.dispatch(UsersActions.updateUser);
    },
    [AppointmentActions.rejectAppointment]: async ({
      commit,
      state,
      dispatch
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/reject`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(
          AppointmentMutations.setAppointmentErrorMessage,
          "something is wrong with the server"
        );
        commit(AppointmentMutations.setAppointmentError, true);
      }
      await vueStore.dispatch(UsersActions.updateUser);
    },
    [AppointmentActions.finishAppointment]: async ({
      commit,
      state,
      dispatch
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/finish`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(
          AppointmentMutations.setAppointmentErrorMessage,
          "something is wrong with the server"
        );
        commit(AppointmentMutations.setAppointmentError, true);
      }
      await vueStore.dispatch(UsersActions.updateUser);
    },
    [AppointmentActions.cancelAppointment]: async ({
      commit,
      state,
      dispatch
    }) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/${vueStore.getters.getUser.role}/cancel`
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(
          AppointmentMutations.setAppointmentErrorMessage,
          "something is wrong with the server"
        );
        commit(AppointmentMutations.setAppointmentError, true);
      }
      await vueStore.dispatch(UsersActions.updateUser);
    },
    [AppointmentActions.editAppointment]: async (
      { commit, dispatch, state },
      payload: AppointmentPatchItem
    ) => {
      try {
        await Vue.axios.patch(
          `/appointment/${state.selectedAppointmentId}/edit`,
          payload
        );
        await dispatch(AppointmentActions.fetchAppointments);
      } catch {
        commit(
          AppointmentMutations.setAppointmentErrorMessage,
          "overlapped appointment or something is wrong with the server"
        );
        commit(AppointmentMutations.setAppointmentError, true);
      }
      await vueStore.dispatch(UsersActions.updateUser);
    }
  }
};

export default store;
