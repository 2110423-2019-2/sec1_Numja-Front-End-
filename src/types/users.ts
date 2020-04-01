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

export interface UsersState {
  users: User[] | [];
}

export enum UsersGetters {
  getUsers = "getUsers",
  getOtherUsers = "getOtherUsers",
  getUserById = "getUserById",
  getTutors = "getTutors",
  getNonAdminUsers = "getNonAdminUsers"
}

export enum UsersMutations {
  setUsers = "setUsers"
}

export enum UsersActions {
  fetchUsers = "fetchUsers",
  test = "test"
}
