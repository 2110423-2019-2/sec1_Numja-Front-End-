import Vue from "vue";
import vueStore from "../index";
import { StoreOptions } from "vuex";
import {
  UsersState,
  UsersActions,
  UsersMutations,
  UsersGetters,
  User,
  UserRole,
  SnackbarActions,
  LoginMutations
} from "@/types";

const store: StoreOptions<UsersState> = {
  state: {
    users: [],
    isError: false,
    isFetching: false,
    isSuccess: false
  },

  getters: {
    [UsersGetters.getUsers]: state => state.users,
    [UsersGetters.getTutors]: state => {
      return state.users.filter(user => {
        return user.role === UserRole.Tutor && user.verified;
      });
    },
    [UsersGetters.getOtherUsers]: state => {
      return state.users.filter(
        user => user._id !== vueStore.getters.getUser._id
      );
    },
    [UsersGetters.getUserById]: state => (id: string) => {
      return state.users.find(user => user._id === id);
    },
    [UsersGetters.getNonAdminUsers]: state =>
      state.users.filter(user => user.role !== UserRole.Admin),
    [UsersGetters.getFetching]: state => state.isFetching
  },

  mutations: {
    [UsersMutations.setUsers]: (state: UsersState, users: User[] | []) => {
      state.users = users;
    },
    [UsersMutations.fetching]: (state: UsersState, isFetching: boolean) => {
      state.isFetching = isFetching;
    }
  },

  actions: {
    [UsersActions.fetchUsers]: async ({ commit, dispatch }) => {
      if (vueStore.getters.getUser) {
        try {
          const response = await Vue.axios.get("/user");
          const responseData: User[] = response.data;
          commit(UsersMutations.setUsers, responseData);
        } catch {
          dispatch(SnackbarActions.push, {
            color: "error",
            message: "Users fetching failed"
          });
        }
      }
    },
    [UsersActions.uploadPortfolio]: async (
      { commit, getters, dispatch },
      payload
    ) => {
      const user = getters.getUser;
      try {
        const response = await Vue.axios.post(
          `user/${user._id}/portfolio/upload`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        dispatch(SnackbarActions.push, {
          color: "success",
          message: "Portfolio uploaded"
        });
      } catch {
        dispatch(SnackbarActions.push, {
          color: "error",
          message: "Upload failed"
        });
      }
    },
    [UsersActions.topup]: async ({ dispatch }, payload: number) => {
      dispatch(UsersActions.setFetching, true);
      await Vue.axios.post("transaction/top-up", { amount: payload });
      await dispatch(UsersActions.updateUser);
      dispatch(UsersActions.setFetching, false);
    },
    [UsersActions.withdraw]: async ({ dispatch }, payload: number) => {
      dispatch(UsersActions.setFetching, true);

      await Vue.axios.post("transaction/withdraw", { amount: payload });
      await dispatch(UsersActions.updateUser);
      dispatch(UsersActions.setFetching, false);
    },
    [UsersActions.updateUser]: async () => {
      const response = await Vue.axios.get<User>("/user/me");
      if (response.status === 200) {
        vueStore.commit(LoginMutations.setUser, response.data);
      }
    }
  }
};

export default store;
