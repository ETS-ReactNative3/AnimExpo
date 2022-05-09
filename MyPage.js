import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import {
  NavigationContainer,
  NavigationEvents,
  useIsFocused,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ route, navigation }) {
  const navigationOptions = {
    title: "MyPage",
  };
  const [savedList, setSavedList] = useState([]);
  const { savedName } = route.params;
  const { id } = route.params;

  useEffect(() => {
    setSavedList([...savedList, savedName]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>MY SAVE LIST</Text>
          <View></View>
          <FlatList
            data={savedList}
            keyExtractor={() => id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <Text>{item}</Text>
              </View>
            )}
            // renderItem={({}) => (
            //   <View style={styles.flatlist}>
            //     <Text>{savedName}</Text>
            //   </View>
            // )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatlist: {
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 25,
    marginRight: 10,
    width: 230,
    // backgroundColor: "#e6e3e8",
    // borderRadius: 20,
  },
});
