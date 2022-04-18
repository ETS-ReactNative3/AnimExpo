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
  apiCall,
  useIsFocused,
  addListener,
} from "@react-navigation/native";

export default function CharacterPage({ route }) {
  const isFocused = useIsFocused();

  const navigationOptions = {
    title: "CharacterPage",
  };
  const [charInfo, setCharInfo] = useState([]);
  const [img, setImg] = useState();
  const { idChar } = route.params;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${idChar}`)
      .then((response) => response.json())
      .then((data) => {
        setCharInfo(data.data);
        setImg(data.data.images.webp.image_url);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 500,
          }}
        >
          <Image style={styles.headerImg} resizeMode="cover" source={img} />
          <Text style={styles.headerImgText}>{charInfo.name}</Text>
        </View>
        <View>
          <Text>About: {charInfo.about}</Text>
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
  headerImg: {
    // paddingTop: 50,
    // width: "100%",
    height: undefined,
    aspectRatio: " auto 354 / 544",
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  headerImgText: {
    fontSize: 20,
    color: "#000",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
