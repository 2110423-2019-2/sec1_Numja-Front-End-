import { User } from "@/types";

export interface VerifyState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  tutors: Array<User>;
  fileList: Array<string>;
}

export enum VerifyActions {
  fetchTutors = "fetchAllTutor",
  verify = "verify",
  unverify = "unverify",
  fetchFileList = "fetchFileList"
}

export enum VerifyMutations {
  setTutors = "setTutorsArray",
  setFileList = "setFileList",
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
