import { Dimensions } from "react-native";

export const containerStyles = {
  minHeight: Dimensions.get("window").height - 100,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 24,
};

export const link = {
  color: "blue",
  margin: 20,
};
