import { User } from '@/types';

export interface AppointmentPageState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  tutors: User[] | null;
}

export enum AppointmentGetters {
  getTutors = 'getTutors'
}

export enum AppointmentActions {
  fetchTutors = 'fetchTutors',
  showTutorPopUp = 'showTutorPopUp',
  hideTutorPopUp = 'hideTutorPopUp'
}

export enum AppointmentMutations {
  setTutors = 'setTutors',
  fetching = 'fetching',
  success = 'success',
  error = 'error'
}
