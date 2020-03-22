import { User } from '@/types';

export interface AppointmentPageState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  tutors: User[] | null;
  selectedTutorIndex: number;
  isShowingPopUp: boolean;
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
  setSelectedIndex = 'setSelectedIndex',
  setShowPopUp = 'setShowPopUp',
  fetching = 'fetching',
  success = 'success',
  error = 'error'
}
