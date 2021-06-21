import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { fetchMoviesById, fetchMovieTrailer } from "../APIs/moviesAPI";
import { containerStyles, link, textCenter } from "../styles/rootStyles";

const DetailScreen = ({ navigation, route }) => {
  const { pushedData } = route.params;

  const { id } = pushedData;
  const [details, setDetails] = useState({
    id: "",
    poster_path: "",
    original_title: "",
    genres: [],
    release_date: "",
    budget: "",
    tagline: "",
  });

  const [isLoading, setLoading] = useState(true);

  const [trailer, setTrailer] = useState("");
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchMoviesById(id).then((data) => {
      setDetails(data);
      setLoading(false);
    });

    fetchMovieTrailer(id).then((data) => {
      setTrailer(data);
    });
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView>
      <View style={containerStyles}>
        <Image
          style={styles.image}
          source={{ uri: details.poster_path }}
        ></Image>

        <Text style={styles.title}>{details.original_title}</Text>
        <Text style={styles.label}>
          {details.tagline} {trailer}
        </Text>

        <View style={styles.shortInfoContainer}>
          {!!details.rating && (
            <View style={styles.shortInfoItem}>
              <Text style={styles.label}>Rating</Text>
              <Text style={styles.info}>{details.vote_average}</Text>
            </View>
          )}

          <View style={styles.shortInfoItem}>
            <Text style={styles.label}>Genres</Text>

            {details.genres.map((item) => (
              <Text style={styles.genre}> {item.name} </Text>
            ))}
          </View>

          <View style={styles.shortInfoItem}>
            <Text style={styles.label}>Release year</Text>
            <Text style={styles.info}>{details.release_date}</Text>
          </View>

          {!!details.budget && (
            <View style={styles.shortInfoItem}>
              <Text style={styles.label}>Budget</Text>
              <Text style={styles.info}>{details.budget}$</Text>
            </View>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>{details.overview}</Text>
        </View>
        {!!trailer && (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={250}
              width={"100%"}
              play={playing}
              videoId={trailer}
              onChangeState={onStateChange}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.92,
    height: 300,
    borderRadius: 12,
    marginTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#3e3e3e",
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 15,
  },
  genre: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 15,
  },

  shortInfoContainer: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  shortInfoItem: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    marginTop: 20,
  },
});

export default DetailScreen;
