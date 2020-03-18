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

export interface VerifyRowItem {
  _id: string;
  verified: boolean;
  username: string;
  firstName: string;
  lastName: string;
  evidenceSentDate: Date;
  evidenceInfo: string;
  action: undefined;
}
