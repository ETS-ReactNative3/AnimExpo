import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { hydrate } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
// import { DataTable } from "react-native-paper";
import {
  NavigationContainer,
  NavigationEvents,
  apiCall,
  useIsFocused,
  addListener,
} from "@react-navigation/native";

export default function Search({ navigation }) {
  const isFocused = useIsFocused();

  const [keyword, setKeyWord] = useState("");
  const [searchBar, setSearchBar] = useState([]);
  const [text, setText] = useState("");
  const [genres, setGenres] = useState([]);
  const [idGenre, setIdGenre] = useState("");
  const [genresResult, setGenresResult] = useState([]);
  const [id, setId] = useState("");

  const getSearchBar = (keyword) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchBar(data.data);
        setText("Results for [" + keyword + "]:");
        setId(data.data.mal_id);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/genres/anime`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
        setIdGenre(data.data.mal_id);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  }, [isFocused]);

  const getAniByGenres = (idGenre) => {
    fetch(`https://api.jikan.moe/v4/anime?genres=${idGenre}`)
      .then((response) => response.json())
      .then((data) => {
        setGenresResult(data.data);
        // setText("Results for Genre [" +genres + "]:");
        setId(data.data.mal_id);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginBottom: 20,
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {/* search bar -----------------------------------------*/}
            <TextInput
              style={{
                width: "60%",
                borderColor: "#b5b5cf",
                borderWidth: 2,
                padding: 5,
              }}
              placeholder="search..."
              onChangeText={(text) => setKeyWord(text)}
            />
            <Button
              title="Search by Name"
              onPress={() => getSearchBar(keyword)}
              containerStyle={styles.containerStyleButton}
              titleStyle={styles.titleStyleButton}
              buttonStyle={{
                backgroundColor: "#b5b5cf",
                borderRadius: 10,
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
            />
          </View>
          {/* suggestions ------------------------------------------*/}
          <View style={{ marginLeft: 25, marginRight: 25, marginBottom: 20 }}>
            <Text style={styles.heading}>Suggestions</Text>
            <View style={styles.contentContainerStyle}>
              <Button
                title="Doraemon"
                onPress={() => getSearchBar("doraemon")}
                containerStyle={styles.containerStyleButton}
                titleStyle={styles.titleStyleButton}
                buttonStyle={styles.buttonStyleButton}
              />
              <Button
                title="Conan"
                onPress={() => getSearchBar("conan")}
                containerStyle={styles.containerStyleButton}
                titleStyle={styles.titleStyleButton}
                buttonStyle={styles.buttonStyleButton}
              />
              <Button
                title="Yaiba"
                onPress={() => getSearchBar("yaiba")}
                containerStyle={styles.containerStyleButton}
                titleStyle={styles.titleStyleButton}
                buttonStyle={styles.buttonStyleButton}
              />
              <Button
                title="Gintama"
                onPress={() => getSearchBar("gintama")}
                containerStyle={styles.containerStyleButton}
                titleStyle={styles.titleStyleButton}
                buttonStyle={styles.buttonStyleButton}
              />
            </View>
          </View>
          {/* Gernes -----------------------------------------------*/}
          <View style={{ marginLeft: 25, marginRight: 25, marginBottom: 20 }}>
            <Text style={styles.heading}>Genres</Text>
            <FlatList
              data={genres.slice(0, 19)}
              keyExtractor={(item) => item.mal_id}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({ item }) => (
                <View>
                  {/* <TouchableOpacity
                  // activeOpacity={0.5}
                  // onPress={fetch(
                  //   `https://api.jikan.moe/v3/search/anime?genre=${item.mal_id}`
                  // )
                  //   .then((response) => response.json())
                  //   .then((data) => {
                  //     setGenre(data.results), setText("Results for:");
                  //   })
                  //   .catch((err) => console.log("something went wrong", err))}
                  > */}
                  <Button
                    title={item.name}
                    containerStyle={styles.containerStyleButton}
                    titleStyle={styles.titleStyleButton}
                    buttonStyle={styles.buttonStyleButton}
                    onPress={() => getAniByGenres(idGenre)}
                  />

                  {/* </TouchableOpacity> */}
                </View>
              )}
            />
          </View>
          {/* search results ---------------------------------------*/}

          <View style={styles.results}>
            <Text style={styles.heading}>{text}</Text>

            <FlatList
              style={styles.flatlist}
              numColumns={2}
              data={searchBar}
              keyExtractor={(item) => item.mal_id}
              renderItem={({ item }) => (
                <View style={styles.flatListView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      navigation.navigate("AnimePage", {
                        id: item.mal_id,
                      });
                    }}
                  >
                    <Text style={styles.caption}>Rank: {item.rank}</Text>
                    <Image
                      style={styles.pictures}
                      source={{ uri: item.images.webp.large_image_url }}
                    />
                    <Text style={styles.caption}>{item.title}</Text>
                    {/* <Text style={styles.caption}>Score: {item.score}</Text> */}
                  </TouchableOpacity>
                </View>
              )}
            />
            <FlatList
              style={styles.flatlist}
              numColumns={2}
              data={genresResult}
              keyExtractor={(item) => item.mal_id}
              renderItem={({ item }) => (
                <View style={styles.flatListView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      navigation.navigate("AnimePage", {
                        id: item.mal_id,
                      });
                    }}
                  >
                    <Text style={styles.caption}>Rank: {item.rank}</Text>
                    <Image
                      style={styles.pictures}
                      source={{ uri: item.images.webp.large_image_url }}
                    />
                    <Text style={styles.caption}>{item.title}</Text>
                    {/* <Text style={styles.caption}>Score: {item.score}</Text> */}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "center",
  },
  pictures: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  heading: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerStyleButton: {
    height: 50,
    marginHorizontalButton: 1,
    alignItems: "center",
  },
  titleStyleButton: {
    color: "black",
    fontSize: 12,
  },
  buttonStyleButton: {
    backgroundColor: "#e6e3e8",
    borderRadius: 10,
    // flexDirection: "row",
    marginLeft: 2,
    marginRight: 2,
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  result: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  flatlist: {
    marginTop: 5,
    marginBottom: 5,
    // marginLeft: 25,
    // marginRight: 10
    width: "90%",
  },
  flatListView: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    backgroundColor: "#e6e3e8",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
  pictures: {
    aspectRatio: 2 / 2,
    height: 100,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    opacity: 20,
  },
  caption: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#000",
    marginBottom: 10,
    marginTop: 5,
    justifyContent: "center",
    textAlign: "center",
    padding: 5,
    width: 150,
  },
});
