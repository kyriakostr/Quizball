export type CategoryQuestions = Question | Top5Question | undefined;

export type Question = {
  id: string;
  question: string;
  answer: string | number;
  points: number;
  answer_type?: string;
  fiftyFifty: string[] | number[];
  image?: string;
};

export type Top5Question = {
  id: string;
  question: string;
  answer: string[];
  points: number;
  answer_type?: string;
};
