import { User, UserRole, UserGender } from "./index";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  gender: UserGender;
  ssin: string;
  role: UserRole;
}

export interface LoginState {
  fetchingLogin: boolean;
  error: boolean;
  token: string | null;
  user: User | null;
  errorMessage: string;
}

export enum LoginGetters {
  isLogin = "isLogin",
  isFetchingLogin = "isFetchingLogin",
  getUser = "getUser",
  getError = "getError",
  getErrorMessage = "getErrorMessage"
}

export enum LoginMutations {
  setToken = "setToken",
  setFetchingLogin = "setFetchingLogin",
  setError = "setError",
  setUser = "setUser",
  setErrorMessage = "serErrorMessage"
}

export enum LoginActions {
  login = "login",
  logout = "logout",
  signUp = "signUp",
  redirect = "redirect",
  setAxiosHeader = "setAxiosHeader",
  fetchUser = "fetchUser",
  protectedRedirect = "protectedRedirect"
}
