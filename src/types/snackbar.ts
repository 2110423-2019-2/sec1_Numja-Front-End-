export interface SnackbarPayload {
  color: string;
  message: string;
}

export interface SnackbarState extends SnackbarPayload{
  isOpen: boolean;
}

export enum SnackbarActions {
  push = 'pushNewNotification',
  reset = 'resetOpenState'
}

export enum SnackbarMutations {
  set = 'setSnackbarState',
  reset = 'resetSnackbarState'
}
