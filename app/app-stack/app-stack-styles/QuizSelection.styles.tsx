import { StyleSheet } from "react-native";

const quizSelectionStyles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#d0f0f2",
    gap: 20,
  },
  playerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E90FF", // football blue
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: "center",
    paddingVertical: 10,
    fontStyle: "italic",
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#f7a600",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
});

export default quizSelectionStyles;
