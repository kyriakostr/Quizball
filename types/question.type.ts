import { PlayerID } from "./player-id.type";

export type CategoryQuestions =
  | Question
  | Top5Question
  | PlayerIDQuestion
  | undefined;

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

export type PlayerIDQuestion = {
  id: string;
  question: PlayerID[];
  answer: string;
  points: number;
  answer_type?: string;
  fiftyFifty: string[] | number[];
};
