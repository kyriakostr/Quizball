import { getFontSize } from "@/app/global-styles/Global.styles";
import { StyleSheet } from "react-native";

const selectCategoryButtonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    marginVertical: 8,
    width: "95%",
  },
  text: {
    color: "#fff",
    fontSize: getFontSize(16),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default selectCategoryButtonStyles;
