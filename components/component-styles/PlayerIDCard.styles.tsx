import { getFontSize } from "@/app/global-styles/Global.styles";
import { StyleSheet } from "react-native";

const playerIDCardStyles = StyleSheet.create({
  view: {
    width: "95%",
    backgroundColor: "#8C42D8",
    padding: 20,
    borderRadius: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  titleText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  question: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: { color: "#fff", fontSize: getFontSize(16) },
});

export default playerIDCardStyles;
