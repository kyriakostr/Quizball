import { usePlayerContext } from "@/hooks/usePlayerContext";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WinScreenprops } from "./screenparams/ScreenParams";

export default function WinScreen({ navigation }: WinScreenprops) {
  const { winningPlayer, getWinningPlayer, setDefaultPlayerInfo } =
    usePlayerContext();

  useEffect(() => {
    getWinningPlayer();
  }, []);

  const winner = winningPlayer?.playerId.toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.emoji}>🎉🏆🎉</Text>

      <Text style={styles.winnerText}>
        {winner ? `${winner} WINS!` : "TIE"}{" "}
      </Text>

      <Text style={styles.subText}>
        {winner
          ? "Congratulations, champion! 👑"
          : "It looks like you are both great!"}{" "}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          setDefaultPlayerInfo();
          navigation.replace("app-stack/quizes/QuizSelection");
        }}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9ec",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ff9800",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  trophy: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
