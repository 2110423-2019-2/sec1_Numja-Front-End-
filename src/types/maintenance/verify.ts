import { User } from "@/types";

export interface VerifyState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  tutors: Array<User>;
}

export interface VerifyTutorPayload {
  id: string;
}

export enum VerifyGetters {
  getTutor = "getTutors"
}

export enum VerifyActions {
  fetchTutors = "fetchAllTutor",
  verify = "verify",
  unverify = "unverify"
}

export enum VerifyMutations {
  setTutors = "setTutorsArray",
  verify = "verify",
  fetching = "fetching",
  success = "success",
  error = "error"
}
