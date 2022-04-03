import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();
import Home from "./Home";
import Search from "./Search";
import AnimePage from "./AnimePage";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#BAABDA",
          activeBackgroundColor: "#533E85",
          inactiveBackgroundColor: "#533E85",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "HOME",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size="large" />
            ),
            title: "AnimExpo",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: "AnimExpo",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Button
                onPress={() => alert("This is a button!")}
                // title="Info"
                color="#fff"
                icon="home"
              />
            ),
            tabBarLabel: "SEARCH",
            // headerShown: false,
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
            // headerShown: false,
            tabBarVisible: false,
            headerTitle: "AnimExpo",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Button
                onPress={() => alert("This is a button!")}
                // title="Info"
                color="#fff"
                icon="home"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
