export interface User {
  _id: string;
  username?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  gender: UserGender;
  birthDate: string;
  credit: number;
  email: string;
  address: string;
  ssin: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  Student = "student",
  Tutor = "tutor",
  Admin = "admin"
}

export enum UserStatus {
  Active = "active",
  Suspended = "suspended"
}

export enum UserGender {
  Male = "male",
  Female = "female"
}

export interface UserState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  users: User[] | [];
}

export enum UserGetters {
  getUsers = "getUsers",
  getOtherUsers = "getOtherUsers",
  getUserById = "getUserById",
  getTutors = "getTutors",
  getNonAdminUsers = "getNonAdminUsers"
}

export enum UserMutations {
  setUsers = "setUsers",
  fetching = "fetching",
  success = "success",
  error = "error"
}

export enum UserActions {
  fetchUsers = "fetchUsers",
  test = "test",
  setFetching = "setFetching",
  setSuccess = "setSuccess",
  setError = "setError",
  uploadPortfolio = "uploadPortfolio"
}
