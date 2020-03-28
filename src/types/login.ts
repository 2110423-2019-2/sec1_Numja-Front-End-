import { User, UserRole, UserGender } from './index';

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
  fetching: boolean;
  error: boolean;
  token: string | null;
  user: User | null;
}

export enum LoginGetters {
  isLogin = 'isLogin',
  isFetching = 'isFetching',
  getUser = 'getUser'
}

export enum LoginMutations {
  setToken = 'setToken',
  setFetching = 'setFetching',
  setError = 'setError',
  setUser = 'setUser'
}

export enum LoginActions {
  login = 'login',
  logout = 'logout',
  signUp = 'signUp',
  redirect = 'redirect',
  protectedRedirect = 'protectedRedirect',
  setAxiosHeader = 'setAxiosHeader'
}
