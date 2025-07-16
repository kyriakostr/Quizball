import { PlayerInfo } from "@/types/player-info.type";
import { PlayerId } from "@/types/playerId.enum";
import { createContext, FC, PropsWithChildren, useState } from "react";

export const player1DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER1ID,
  playingDetails: {},
  points: 0,
};

export const player2DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER2ID,
  playingDetails: {},
  points: 0,
};

export const PlayerContext = createContext<{
  playersInfo: PlayerInfo[];
  currentPlayer: PlayerInfo;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  setPlayersInfo: React.Dispatch<React.SetStateAction<PlayerInfo[]>>;
}>({
  playersInfo: [player1DeafaultInfo, player2DeafaultInfo],
  currentPlayer: player1DeafaultInfo,
  setPlayersInfo: () => {},
  setCurrentPlayer: () => {},
});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([
    player1DeafaultInfo,
    player2DeafaultInfo,
  ]);
  const [currentPlayer, setCurrentPlayer] =
    useState<PlayerInfo>(player1DeafaultInfo);
  return (
    <PlayerContext.Provider
      value={{ playersInfo, currentPlayer, setPlayersInfo, setCurrentPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
