import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import { fetchMovieByQuery, fetchTrendingMovies } from "../APIs/moviesAPI";
import FilmCard from "../components/FilmCard/FilmCard";
import { containerStyles, link } from "../styles/rootStyles";

const FilmsScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const searchFilm = () => {
    if (!query) {
      return;
    }

    setLoading(true);

    fetchMovieByQuery(query).then((data) => {
      setMovies(data);
      setLoading(false);
      console.log(data);
    });
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    fetchMovieByQuery(query).then((data) => {
      setMovies(data);
      setLoading(false);
      console.log(data);
    }, []);

    return () => {
      setLoading(true);
    };
  }, []);

  if (isLoading) {
    return (
      <View style={containerStyles}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />

      <View style={containerStyles}>
        <View style={styles.searchBar}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginTop: 30,
              marginBottom: 30,
              width: 254,
            }}
            onChangeText={(text) => {
              setQuery(text);
            }}
            value={query}
          />

          <Button onPress={searchFilm} title={"find"}></Button>
        </View>
        {movies.map((item) => (
          <FilmCard
            key={item.id}
            pressCallback={() =>
              navigation.push("Detail", {
                pushedData: { id: item.id },
              })
            }
            text={item.title}
            img={item.backdrop_path}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: 30,
    fontWeight: "bold",
  },
  searchBar: { flexDirection: "row", alignItems: "center" },
  searchButton: {
    backgroundColor: "#000000",
    width: 50,
    height: 50,
  },
});

export default FilmsScreen;
