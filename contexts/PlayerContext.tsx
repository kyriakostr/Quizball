import { GameDetails } from "@/types/player-details.type";
import { PlayerInfo } from "@/types/player-info.type";
import { PlayerId } from "@/types/playerId.enum";
import { createContext, FC, PropsWithChildren, useState } from "react";

export const player1DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER1ID,
  points: 0,
};

export const player2DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER2ID,
  points: 0,
};

export const PlayerContext = createContext<{
  playersInfo: PlayerInfo[];
  currentPlayer: PlayerInfo;
  gameDetails: GameDetails;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  setPlayersInfo: React.Dispatch<React.SetStateAction<PlayerInfo[]>>;
  setGameDetails: React.Dispatch<React.SetStateAction<GameDetails>>;
}>({
  playersInfo: [player1DeafaultInfo, player2DeafaultInfo],
  currentPlayer: player1DeafaultInfo,
  gameDetails: {},
  setPlayersInfo: () => {},
  setCurrentPlayer: () => {},
  setGameDetails: () => {},
});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([
    player1DeafaultInfo,
    player2DeafaultInfo,
  ]);
  const [currentPlayer, setCurrentPlayer] =
    useState<PlayerInfo>(player1DeafaultInfo);
  const [gameDetails, setGameDetails] = useState<GameDetails>({});
  return (
    <PlayerContext.Provider
      value={{
        playersInfo,
        currentPlayer,
        gameDetails,
        setPlayersInfo,
        setCurrentPlayer,
        setGameDetails,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
