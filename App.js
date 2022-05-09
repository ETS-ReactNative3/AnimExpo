import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
import Home from "./Home";
import Search from "./Search";
import AnimePage from "./AnimePage";
import CharacterPage from "./CharacterPage";
import MyPage from "./MyPage";

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
            // unmountOnBlur: true,
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="home" color={color} size="large" />
            // ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: "#6a3d74",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: "#6a3d74",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: "center",
            tabBarLabel: "SEARCH",
          }}
        />

        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            headerTitle: "AnimExpo",
            headerStyle: styles.headerStyle,
            headerTintColor: "#6a3d74",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: "center",
            tabBarLabel: "MY PAGE",
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
            headerTintColor: "#6a3d74",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: "center",
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
            headerTintColor: "#6a3d74",
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: "center",
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

  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

//color palette: https://lospec.com/palette-list/purpleskin
