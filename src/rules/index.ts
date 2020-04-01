export * from "./login";
export { appointmentRules } from "./appointment";

export type Rule = { (data: string): boolean | string };
