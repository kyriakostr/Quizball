import { width } from "@/app/global-styles/Global.styles";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type SelectCategoryButtonProps = {
  color: string;
  text: string;
};

export default function SelectCategoryButton({
  color,
  text,
}: SelectCategoryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
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
    width: 0.5 * width,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
