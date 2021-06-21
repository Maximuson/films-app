import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./src/screens/MainScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FilmsScreen from "./src/screens/FilmScreen";
import FavoritesScreen from "./src/screens/FavouriteScreen";
import {
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Trending movies"} component={MainScreen} />
      <Stack.Screen name={"Detail"} component={DetailScreen} />
    </Stack.Navigator>
  );
};

const FilmsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Films"} component={FilmsScreen} />
      <Stack.Screen name={"Detail"} component={DetailScreen} />
    </Stack.Navigator>
  );
};

const FavoritesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Favorites"} component={FavoritesScreen} />
      <Stack.Screen name={"Detail"} component={DetailScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    //редакс если надо
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={"Main"}
          component={MainStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={"Films"}
          component={FilmsStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="video-vintage"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"Favourites"}
          component={FavoritesStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="favorite" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
