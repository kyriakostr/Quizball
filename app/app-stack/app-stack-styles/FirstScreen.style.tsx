import { StyleSheet } from "react-native";

const firstScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0f0f2", // Light teal background
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  logoContainer: {
    width: 300,
    height: 250,
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007c91", // Darker teal
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#336b6b", // Softer, muted teal for elegance
    fontStyle: "italic", // Adds a refined tone
    fontWeight: "300", // Light weight
    letterSpacing: 0.5, // Subtle spacing for readability
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f7a600", // Orange (matches the ball)
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default firstScreenStyles;
