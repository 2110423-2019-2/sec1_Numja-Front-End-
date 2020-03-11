export * from "./login";

export type Rule = { (data: string): boolean | string };
