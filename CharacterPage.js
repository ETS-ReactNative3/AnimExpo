import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function CharacterPage({ navigation, route }) {
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
          <Image
            style={styles.headerImg}
            resizeMode="cover"
            source={{ uri: img }}
          />
          <Text style={styles.headerImgText}>{charInfo.name}</Text>
        </View>
        <View style={styles.about}>
          <Text>{charInfo.about}</Text>
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
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
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
  about: {
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});
