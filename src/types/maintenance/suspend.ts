import { User } from "@/types";

export interface SuspendState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  users: Array<User>;
}

export interface SuspendUserPayload {
  id: string;
}

export enum SuspendGetters {}

export enum SuspendActions {
  fetchUsers = "fetchAllUsers",
  suspend = "suspend",
  activate = "activate"
}

export enum SuspendMutations {
  setUsers = "setUsersArray",
  suspend = "suspend",
  fetching = "fetching",
  success = "success",
  error = "error"
}
