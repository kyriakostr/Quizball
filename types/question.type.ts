import { Flags } from "./flag.enum";

export type Question = {
  question: string;
  answer: string | number;
  flag?: Flags;
};
