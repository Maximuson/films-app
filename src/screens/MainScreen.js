import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { fetchTrendingMovies } from "../APIs/moviesAPI";
import FilmCard from "../components/FilmCard/FilmCard";
import { containerStyles, link } from "../styles/rootStyles";

const MainScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies(page).then((data) => {
      setMovies(data);
      setLoading(false);
      console.log(data);
    });

    return () => {
      setLoading(true);
    };
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View style={containerStyles}>
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

export default MainScreen;
