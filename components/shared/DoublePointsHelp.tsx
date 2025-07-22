import { usePlayerContext } from "@/hooks/usePlayerContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function DoublePointsHelp() {
  const { currentPlayer, doublePointsRound, setDoublePointsRound } =
    usePlayerContext();
  return (
    <View>
      {!currentPlayer.help.doublePoints && (
        <Pressable
          onPress={() => {
            setDoublePointsRound(true);
          }}
          disabled={doublePointsRound}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            doublePointsRound && styles.disabled,
          ]}
        >
          <Text style={[styles.text]}>Double Points</Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: "#A5B4FC",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
