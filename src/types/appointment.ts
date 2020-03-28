import { User } from '@/types';

export interface AppointmentPageState {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  tutors: User[] | null;
  appointments: Appointment[] | null;
}

export enum AppointmentState {
  pending = 'pending'
}

export interface CalendarReference {
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
  hasDay: boolean;
  hasTime: boolean;
  past: boolean;
  preset: boolean;
  future: boolean;
}

export interface Event extends Appointment {
  name: string;
  start: string;
  end: string;
}

export interface Appointment {
  status: AppointmentState;
  _id: string;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  student: string;
  tutor: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum AppointmentGetters {
  getTutors = 'getTutors',
  getAppointments = 'getAppointments'
}

export enum AppointmentActions {
  fetchTutors = 'fetchTutors',
  fetchAppointments = 'fetchAppointments'
}

export enum AppointmentMutations {
  setTutors = 'setTutors',
  setAppointments = 'setAppointments',
  fetching = 'fetching',
  success = 'success',
  error = 'error'
}
