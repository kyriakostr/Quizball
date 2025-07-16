import { PlayerDetails } from "./player-details.type";
import { PlayerId } from "./playerId.enum";

export type PlayerInfo = {
  playerId: PlayerId;
  playingDetails: PlayerDetails;
  points: number;
};
