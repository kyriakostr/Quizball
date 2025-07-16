import {
  player1DeafaultInfo,
  player2DeafaultInfo,
  PlayerContext,
} from "@/contexts/PlayerContext";
import categoryPlaysMap from "@/types/category-plays.map";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { PlayerDetails } from "@/types/player-details.type";
import { PlayerId } from "@/types/playerId.enum";
import { useContext } from "react";

export const usePlayerContext = () => {
  const { currentPlayer, playersInfo, setPlayersInfo, setCurrentPlayer } =
    useContext(PlayerContext);

  const setDefaultPlayerInfo = () => {
    const newDefaultPlayersInfo = playersInfo.map((playerInfo) =>
      playerInfo.playerId === PlayerId.PLAYER1ID
        ? player1DeafaultInfo
        : player2DeafaultInfo
    );
    setPlayersInfo(newDefaultPlayersInfo);
    setCurrentPlayer(player1DeafaultInfo);
  };

  const disableCategory = (category: Category): boolean => {
    if (
      currentPlayer.playingDetails &&
      currentPlayer.playingDetails[category] &&
      currentPlayer.playingDetails[category].length ===
        categoryPlaysMap[category].length
    ) {
      return true;
    }

    return false;
  };

  const disableDifficulty = (
    category: Category,
    difficulty: Difficulty
  ): boolean => {
    if (
      currentPlayer.playingDetails &&
      currentPlayer.playingDetails[category] &&
      currentPlayer.playingDetails[category].includes(difficulty)
    ) {
      return true;
    }
    return false;
  };

  const setCurrentPlayerInfo = (category: Category, difficulty: Difficulty) => {
    setCurrentPlayer((prev) => {
      let currentDetails: PlayerDetails = {};
      const prevDetails = prev.playingDetails;
      if (!prevDetails || !prevDetails[category]) {
        currentDetails[category] = [difficulty];
      } else if (prevDetails[category].includes(difficulty)) {
        currentDetails[category] = [...prevDetails[category]];
      } else {
        currentDetails[category] = [...prevDetails[category], difficulty];
      }

      console.log({ ...prevDetails, ...currentDetails });
      return {
        ...prev,
        playingDetails: { ...prevDetails, ...currentDetails },
      };
    });
  };

  const setNewCurrentPlayer = () => {
    const newPlayersInfo = playersInfo.map((player) =>
      player.playerId === currentPlayer.playerId ? currentPlayer : player
    );
    const newPlayer = playersInfo.find(
      (player) => player.playerId !== currentPlayer.playerId
    );
    setPlayersInfo(newPlayersInfo);
    if (newPlayer) {
      setCurrentPlayer(newPlayer);
    }
  };

  return {
    currentPlayer,
    setDefaultPlayerInfo,
    setNewCurrentPlayer,
    setCurrentPlayerInfo,
    disableCategory,
    disableDifficulty,
  };
};
