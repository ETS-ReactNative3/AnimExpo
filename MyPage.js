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
  ListItem,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ route, navigation }) {
  const navigationOptions = {
    title: "AnimePage",
  };

  const { id } = route.params;
  // const { savedListArr } = route.params;
  const { savedName } = route.params;
  const [savedListArr, setSavedListArr] = useState([]);

  useEffect(() => {
    setSavedListArr([savedName, ...savedListArr]);
    getSavedAni();
    console.log("get" + savedName);
  }, []);

  const getSavedAni = async () => {
    try {
      await AsyncStorage.getItem(JSON.stringify(id));
    } catch (e) {
      console.error(e);
    }
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerImgText}>MY SAVE LIST</Text>

        <FlatList
          data={savedListArr}
          ItemSeparatorComponent={listSeparator}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.flatlist}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
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
    width: "auto",
    // backgroundColor: "#e6e3e8",
    // borderRadius: 20,
  },
  headerImgText: {
    fontSize: 20,
    color: "#6a3d74",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
});
