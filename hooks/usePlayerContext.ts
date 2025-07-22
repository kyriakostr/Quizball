import {
  player1DeafaultInfo,
  player2DeafaultInfo,
  PlayerContext,
} from "@/contexts/PlayerContext";
import ApiService from "@/services/api-service";
import categoryPlaysMap from "@/types/category-plays.map";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { GameDetails } from "@/types/player-details.type";
import { PlayerInfo } from "@/types/player-info.type";
import { PlayerId } from "@/types/playerId.enum";
import { useContext, useState } from "react";

export const usePlayerContext = () => {
  const {
    currentPlayer,
    playersInfo,
    gameDetails,
    doublePointsRound,
    answeredQuestions,
    setAnsweredQuestions,
    setDoublePointsRound,
    setGameDetails,
    setPlayersInfo,
    setCurrentPlayer,
  } = useContext(PlayerContext);

  const [winningPlayer, setWinningPlayer] = useState<PlayerInfo>();

  const getWinningPlayer = () => {
    const winningPlayer = playersInfo.sort(
      (player1, player2) => player2.points - player1.points
    )[0];

    setWinningPlayer(winningPlayer);

    if (winningPlayer.points === playersInfo[1].points) {
      setWinningPlayer(undefined);
    }
  };

  const setCurrentPlayersHelps = (fiftyFifty: boolean) => {
    if (fiftyFifty) {
      setCurrentPlayer((prev) => ({
        ...prev,
        help: {
          fiftyFifty: true,
          doublePoints: prev.help.doublePoints,
        },
      }));
    } else {
      setCurrentPlayer((prev) => ({
        ...prev,
        help: {
          fiftyFifty: prev.help.fiftyFifty,
          doublePoints: true,
        },
      }));
    }
  };

  const setDefaultPlayerInfo = () => {
    const newDefaultPlayersInfo = playersInfo.map((playerInfo) =>
      playerInfo.playerId === PlayerId.PLAYER1ID
        ? player1DeafaultInfo
        : player2DeafaultInfo
    );
    setDoublePointsRound(false);
    setAnsweredQuestions([]);
    setPlayersInfo(newDefaultPlayersInfo);
    setCurrentPlayer(player1DeafaultInfo);
    setGameDetails({});
  };

  const endTheGame = (): boolean => {
    return Object.entries(categoryPlaysMap).every(
      ([category, expectedDifficulties]) => {
        const actualDifficulties = gameDetails[category];
        if (!actualDifficulties) return false;

        const hasAllDifficulties =
          expectedDifficulties.every((diff) =>
            actualDifficulties.includes(diff)
          ) && expectedDifficulties.length === actualDifficulties.length;

        return hasAllDifficulties;
      }
    );
  };

  const disableCategory = (category: Category): boolean => {
    if (
      gameDetails &&
      gameDetails[category] &&
      gameDetails[category].length === categoryPlaysMap[category].length
    ) {
      return true;
    }

    return false;
  };

  const disableDifficulty = (
    category: Category,
    difficulty: Difficulty,
    index: number
  ): boolean => {
    if (
      gameDetails &&
      gameDetails[category] &&
      gameDetails[category][index] === categoryPlaysMap[category][index]
    ) {
      return true;
    }
    if (
      gameDetails &&
      gameDetails[category] &&
      gameDetails[category].includes(difficulty) &&
      !categoryPlaysMap[category].every((dif) => dif === difficulty)
    ) {
      return true;
    }
    return false;
  };

  const setGameDetailsInfo = (category: Category, difficulty: Difficulty) => {
    setGameDetails((prev) => {
      let currentDetails: GameDetails = {};
      if (!prev || !prev[category]) {
        currentDetails[category] = [difficulty];
      } else {
        currentDetails[category] = [...prev[category], difficulty];
      }

      return {
        ...prev,
        ...currentDetails,
      };
    });
  };
  const getFootballTeams = async () => {
    try {
      const footballTeamsResponse = await ApiService.getFootballTeams();
      console.log("Teams", footballTeamsResponse);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  const addPointsToPlayer = (
    correct: boolean,
    help: boolean,
    questionPoints: number
  ) => {
    const allpoints = help ? 1 : questionPoints;
    let points = correct ? allpoints : 0;
    points = doublePointsRound ? 2 * points : points;
    setCurrentPlayer((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  };
  const setNewCurrentPlayer = () => {
    const newPlayersInfo = playersInfo.map((player) =>
      player.playerId === currentPlayer.playerId ? currentPlayer : player
    );
    const newPlayer = playersInfo.find(
      (player) => player.playerId !== currentPlayer.playerId
    );
    setDoublePointsRound(false);
    setPlayersInfo(newPlayersInfo);
    if (newPlayer) {
      setCurrentPlayer(newPlayer);
    }
  };

  return {
    currentPlayer,
    winningPlayer,
    doublePointsRound,
    answeredQuestions,
    setAnsweredQuestions,
    setDoublePointsRound,
    setCurrentPlayersHelps,
    getFootballTeams,
    setDefaultPlayerInfo,
    setNewCurrentPlayer,
    endTheGame,
    setGameDetailsInfo,
    addPointsToPlayer,
    getWinningPlayer,
    disableCategory,
    disableDifficulty,
  };
};
