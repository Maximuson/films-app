import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  card: {
    width: 300,
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    position: "absolute",
    top: 10,
    left: 10,

    fontSize: 26,

    color: "#ffffff",
    textShadowOffset: { x: 1, y: 3 },
    textShadowColor: "#000000",
    textShadowRadius: 2,
    zIndex: 2,
  },
});
