import { StyleSheet } from "react-native";

export const questionScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    width: 220,
    borderColor: "#6200ea",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  nextButton: {
    backgroundColor: "#009688",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  correctText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
  suggestionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    gap: 10,
  },

  suggestionItem: {
    backgroundColor: "#d1c4e9",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },

  suggestionText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
