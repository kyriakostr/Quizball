import { PlayerDetails } from "./player-details.type";

export type PlayerInfo = {
  playerId: string;
  playingDetails: PlayerDetails;
  points: number;
};
