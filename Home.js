import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AnimePage from "./AnimePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Home({ navigation }) {
  const Stack = createNativeStackNavigator();

  const [aniTop, setAniTop] = useState([]);
  const [aniCharacter, setAniCharacter] = useState([]);
  const [aniReview, setAniReview] = useState([]);
  const [id, setId] = useState("");

  const fetchData = () => {
    const aniTopAPI = "https://api.jikan.moe/v4/top/anime";
    const aniCharacterAPI = "https://api.jikan.moe/v4/top/characters";
    const aniReviewAPI = "https://api.jikan.moe/v4/top/reviews";

    const getAniTop = axios.get(aniTopAPI);
    const getAniCharacter = axios.get(aniCharacterAPI);
    const getAniReview = axios.get(aniReviewAPI);

    axios.all([getAniTop, getAniCharacter, getAniReview]).then(
      axios.spread((...allData) => {
        const allDataTop = allData[0].data.data;
        const allDataCharacter = allData[1].data.data;
        const allDataReview = allData[2].data.data;

        setAniTop(allDataTop);
        setAniCharacter(allDataCharacter);
        setAniReview(allDataReview);
        setId(allDataTop.mal_id);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toAnimePage = () => {
    navigation.navigate("AnimePage");
  };

  const onPressButton = () => {
    alert("You tapped the button!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* TOP ANIME */}
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.categories}>Top rated Anime</Text>
          <FlatList
            horizontal={true}
            data={aniTop}
            keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={toAnimePage}
                  setId={item.mal_id}
                >
                  <Text style={styles.caption}>Rank {item.rank}</Text>
                  <Image
                    style={styles.pictures}
                    source={{ uri: item.images.webp.large_image_url }}
                  />
                  <Text style={styles.caption}>{item.title}</Text>
                  <Text style={styles.caption}>Score: {item.score}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* TOP CHARACTER */}
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.categories}>Top Character</Text>
          <FlatList
            horizontal={true}
            data={aniCharacter}
            keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressButton}>
                  <Text style={styles.caption}>{item.name}</Text>
                  <Image
                    style={styles.pictures}
                    source={{ uri: item.images.webp.image_url }}
                  />
                  <Text style={styles.caption}>Vote: {item.favorites}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* TOP REVIEW ANIME */}
        <View style={{ paddingBottom: 40 }}>
          <Text style={styles.categories}>Top Reviewed Anime</Text>
          <FlatList
            horizontal={true}
            data={aniReview}
            keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <Text style={styles.caption}>Vote: {item.votes}</Text>
                <Image
                  style={styles.pictures}
                  source={{ uri: item.entry.images.webp.large_image_url }}
                />
                <Text style={styles.caption}>{item.entry.title}</Text>
              </View>
            )}
          />
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  flatlist: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 25,
    marginRight: 10,
    width: 230,
    backgroundColor: "#BAABDA",
  },
  categories: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#BAABDA",
    marginBottom: 10,
    marginLeft: 25,
    marginTop: 20,
  },
  caption: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#000",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  pictures: {
    width: 230,
    height: 120,
    marginBottom: 10,
  },
});
