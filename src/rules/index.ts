export * from './login';
export { appointmentRules } from './appointment';
export * from './credit';

export type Rule = { (data: string): boolean | string };
