import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AnimePage from "./AnimePage";
import {
  NavigationContainer,
  NavigationEvents,
  apiCall,
  useIsFocused,
  addListener,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem } from "react-native-elements";

export default function Home({ navigation }) {
  const Stack = createNativeStackNavigator();
  const isFocused = useIsFocused();

  const [aniTop, setAniTop] = useState([]);
  const [aniCharacter, setAniCharacter] = useState([]);
  const [aniReview, setAniReview] = useState([]);
  const [id, setId] = useState("");
  const [idChar, setIdChar] = useState("");

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
        setId(allDataCharacter.mal_id);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.headerImg}
            resizeMode="cover"
            source={{ uri: "https://wallpapercave.com/wp/wp9000194.jpg" }}
          >
            <Text style={styles.headerImgText}>Welcome</Text>
          </ImageBackground>
        </View>
        {/* TOP ANIME------------------------------------------------ */}
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
                  onPress={() => {
                    navigation.navigate("AnimePage", {
                      id: item.mal_id,
                    });
                  }}
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

        {/* TOP CHARACTER------------------------------------------- */}
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.categories}>Top Character</Text>
          <FlatList
            horizontal={true}
            data={aniCharacter}
            keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("CharacterPage", {
                      idChar: item.mal_id,
                    });
                  }}
                >
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

        {/* TOP REVIEW ANIME------------------------------------ */}
        <View style={{ paddingBottom: 40 }}>
          <Text style={styles.categories}>Top Reviewed Anime</Text>
          <FlatList
            horizontal={true}
            data={aniReview}
            keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("AnimePage", {
                      id: item.entry.mal_id,
                    });
                  }}
                >
                  <Text style={styles.caption}>Vote: {item.votes}</Text>
                  <Image
                    style={styles.pictures}
                    source={{ uri: item.entry.images.webp.large_image_url }}
                  />
                  <Text style={styles.caption}>{item.entry.title}</Text>
                </TouchableOpacity>
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
    backgroundColor: "#fff",
    flex: 1,
  },
  headerImg: {
    paddingTop: 250,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  headerImgText: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#b5b5cf",
  },
  flatlist: {
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 25,
    marginRight: 10,
    width: 230,
    backgroundColor: "#e6e3e8",
    borderRadius: 20,
  },
  categories: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#6a3d74",
    marginBottom: 2,
    marginLeft: 25,
    marginTop: 10,
  },
  caption: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#000",
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  pictures: {
    width: 230,
    height: 120,
    marginBottom: 10,
    opacity: 20,
  },
});
