export type Question = {
  question: string;
  answer: string | number;
  points: number;
  answer_type?: string;
  fiftyFifty: string[] | number[];
};
