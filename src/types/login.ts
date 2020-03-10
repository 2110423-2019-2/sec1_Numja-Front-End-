export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginState {
  fetching: boolean;
  error: boolean;
  token: string | null;
  user: User | null;
}

export interface User {
  username: string;
  role: UserRole;
}

export enum UserRole {
  Student = "student",
  Tutor = "tutor",
  Admin = "admin"
}

export enum LoginGetters {
  isLogin = "isLogin",
  isFetching = "isFetching"
}

export enum LoginMutations {
  setToken = "setToken",
  setFetching = "setFetching",
  setError = "setError",
  setUser = "setUser"
}

export enum LoginActions {
  login = "login",
  logout = "logout",
  signUp = "signUp",
  redirect = "redirect"
}
