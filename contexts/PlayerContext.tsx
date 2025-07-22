import { GameDetails } from "@/types/player-details.type";
import { PlayerInfo } from "@/types/player-info.type";
import { PlayerId } from "@/types/playerId.enum";
import {
  CategoryQuestions
} from "@/types/question.type";
import { createContext, FC, PropsWithChildren, useState } from "react";

export const player1DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER1ID,
  help: {
    fiftyFifty: false,
    doublePoints: false,
  },
  points: 0,
};

export const player2DeafaultInfo: PlayerInfo = {
  playerId: PlayerId.PLAYER2ID,
  help: {
    fiftyFifty: false,
    doublePoints: false,
  },
  points: 0,
};

export const PlayerContext = createContext<{
  playersInfo: PlayerInfo[];
  currentPlayer: PlayerInfo;
  gameDetails: GameDetails;
  doublePointsRound: boolean;
  answeredQuestions: CategoryQuestions[];
  setAnsweredQuestions: React.Dispatch<
    React.SetStateAction<CategoryQuestions[]>
  >;
  setDoublePointsRound: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  setPlayersInfo: React.Dispatch<React.SetStateAction<PlayerInfo[]>>;
  setGameDetails: React.Dispatch<React.SetStateAction<GameDetails>>;
}>({
  playersInfo: [player1DeafaultInfo, player2DeafaultInfo],
  currentPlayer: player1DeafaultInfo,
  gameDetails: {},
  doublePointsRound: false,
  answeredQuestions: [],
  setAnsweredQuestions: () => {},
  setDoublePointsRound: () => {},
  setPlayersInfo: () => {},
  setCurrentPlayer: () => {},
  setGameDetails: () => {},
});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([
    player1DeafaultInfo,
    player2DeafaultInfo,
  ]);
  const [doublePointsRound, setDoublePointsRound] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] =
    useState<PlayerInfo>(player1DeafaultInfo);
  const [gameDetails, setGameDetails] = useState<GameDetails>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<
    CategoryQuestions[]
  >([]);

  return (
    <PlayerContext.Provider
      value={{
        playersInfo,
        currentPlayer,
        gameDetails,
        doublePointsRound,
        answeredQuestions,
        setAnsweredQuestions,
        setDoublePointsRound,
        setPlayersInfo,
        setCurrentPlayer,
        setGameDetails,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
