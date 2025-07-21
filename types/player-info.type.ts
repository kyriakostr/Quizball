import { PlayersHelp } from "./player-helps.type";
import { PlayerId } from "./playerId.enum";

export type PlayerInfo = {
  playerId: PlayerId;
  help: PlayersHelp;
  points: number;
};
