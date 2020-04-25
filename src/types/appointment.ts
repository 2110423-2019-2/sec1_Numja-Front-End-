export interface AppointmentPayload {
  selectedAppointmentId: string;
}

export interface AppointmentPatchItem {
  startTime: string;
  endTime: string;
  price: number;
  location: string;
}

export interface AppointmentPageState extends AppointmentPayload {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  appointments: Appointment[] | null;
}

export enum AppointmentState {
  pending = 'pending',
  cancelled = 'cancelled',
  finished = 'finished',
  approved = 'approved',
  rejected = 'rejected',
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

export interface CalendarEventReference {
  event: Event;
  day: any;
  outside: boolean;
  start: boolean;
  end: boolean;
  timed: boolean;
  nativeElement: any;
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
  getAppointments = 'getAppointments',
}

export enum AppointmentActions {
  fetchAppointments = 'fetchAppointments',
  acceptAppointment = 'acceptAppointment',
  rejectAppointment = 'rejectAppointment',
  cancelAppointment = 'cancelAppointment',
  editAppointment = 'editAppointment',
  finishAppointment = 'finishAppointment',
  selectAppointment = 'selectAppointment',
}

export enum AppointmentMutations {
  setAppointments = 'setAppointments',
  setSelectedAppointmentId = 'setSelectedAppointmentId',
  fetching = 'fetching',
  success = 'success',
  error = 'error',
}
