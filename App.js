import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import { Header } from "react-native-elements";

const Tab = createBottomTabNavigator();
import Home from "./Home";
import Search from "./Search";
import AnimePage from "./AnimePage";
import CharacterPage from "./CharacterPage";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#e6e3e8",
          activeBackgroundColor: "#b5b5cf",
          inactiveBackgroundColor: "#b5b5cf",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "HOME",
            unmountOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size="large" />
            ),
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: styles.headerTitleAlign,
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: styles.headerTitleAlign,
            headerLeft: () => (
              <Button
                onPress={() => alert("This is a button!")}
                // title="Info"
                color="#fff"
                icon="home"
              />
            ),
            tabBarLabel: "SEARCH",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-circle" color={color} size="large" />
            ),
          }}
        />

        <Tab.Screen
          name="AnimePage"
          component={AnimePage}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: styles.headerTitleAlign,
            // headerLeft: () => <Button title="Go back" />,
          }}
        />

        <Tab.Screen
          name="CharacterPage"
          component={CharacterPage}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: styles.headerTitleAlign,
            // headerLeft: () => <Button title="Go back" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#b5b5cf",
  },
  headerTintColor: {
    headerTintColor: "fff",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerTitleAlign: {
    headerTitleAlign: "center",
  },
});

//color palette: https://lospec.com/palette-list/purpleskin
