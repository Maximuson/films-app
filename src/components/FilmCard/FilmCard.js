import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./FilmCardStyles";

const FilmCard = ({ img, text, pressCallback }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={pressCallback}>
        <Image style={styles.image} source={{ uri: img }}></Image>
        <Text onPress={pressCallback} style={styles.label}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilmCard;
