export type Question = {
  id: string;
  question: string;
  answer: string | number;
  points: number;
  answer_type?: string;
  fiftyFifty: string[] | number[];
  image?: string;
};
