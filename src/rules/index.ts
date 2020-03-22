export * from './login';
export * from './appointment';

export type Rule = { (data: string): boolean | string };
