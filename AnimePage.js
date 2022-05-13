import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AnimePage({ route, navigation }) {
  const isFocused = useIsFocused();

  const navigationOptions = {
    title: "AnimePage",
  };

  const [animeInfo, setAnimeInfo] = useState([]);
  const [img, setImg] = useState();
  const { id } = route.params;

  const [savedName, setSavedName] = useState("");
  const [savedListArr, setSavedListArr] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeInfo(data.data);
        setImg(data.data.images.jpg.large_image_url);
        setSavedName(data.data.title);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  }, [isFocused]);

  const saveAnime = async () => {
    // setSavedListArr([savedName, ...savedListArr]);
    try {
      await AsyncStorage.setItem(JSON.stringify(id), JSON.stringify(savedName));
    } catch (e) {
      console.error(e);
    }

    console.log("saved " + savedName);

    navigation.navigate("MyPage", {
      savedName: savedName,
      id: id,
      // savedListArr: savedListArr,
    });
  };

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
          <Image style={styles.headerImg} source={{ uri: img }} />
          <Text style={styles.headerImgText}>{animeInfo.title}</Text>
          <Button
            title={"Save"}
            onPress={saveAnime}
            buttonStyle={{
              backgroundColor: "#b5b5cf",
              borderRadius: 10,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 0,
              marginRight: 20,
            }}
          />
          {/* <Button title={"get"} onPress={getSavedAni} />
          <Text>a: {savedName}</Text> */}
        </View>

        <View style={styles.facts}>
          <Text>Title in Japanese: {animeInfo.title_japanese}</Text>
          <Text>Type: {animeInfo.type}</Text>
          <Text>Source: {animeInfo.source}</Text>
          <Text>Episodes: {animeInfo.episodes}</Text>
          <Text>Status: {animeInfo.status}</Text>
          <Text>Duration: {animeInfo.duration}</Text>
          <Text>
            Score: {animeInfo.score} by {animeInfo.score_by}
          </Text>
          <Text>Rank: {animeInfo.rank} </Text>
          <Text>Rating: {animeInfo.rating} </Text>
          <Text>Produce year: {animeInfo.year} </Text>
        </View>

        <View style={styles.synopsis}>
          <Text>{animeInfo.synopsis}</Text>
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
  synopsis: {
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#e6e3e8",
    fontSize: 12,
  },
  facts: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});
