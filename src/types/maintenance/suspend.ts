import { User } from "@/types";

export interface SuspendState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  users: Array<User>;
}

export interface SuspendUserPayload {
  user: User;
}

export enum SuspendGetters {}

export enum SuspendActions {
  fetchUsers = "fetchAllUsers",
  suspend = "suspend",
  activate = "activate"
}

export enum SuspendMutations {
  setUsers = "setUsersArray"
}
