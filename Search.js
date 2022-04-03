import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function Search({ navigation }) {
  const [keyword, setKeyWord] = useState("");
  const [searchBar, setSearchBar] = useState([]);
  const [text, setText] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  const [idGenre, setIdGenre] = useState("");

  const getSearchBar = () => {
    fetch(`https://api.jikan.moe/v4/anime?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchBar(data.data), setText("Results for " + keyword + ":");
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  const getDoraemon = () => {
    fetch(`https://api.jikan.moe/v4/anime?q=Doraemon`)
      .then((response) => response.json())
      .then((data) => {
        setSearchBar(data.data), setText("Results for Doraemon:");
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  const getYaiba = () => {
    fetch(`https://api.jikan.moe/v4/anime?q=Yaiba`)
      .then((response) => response.json())
      .then((data) => {
        setSearchBar(data.data), setText("Results for Yaiba:");
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/genres/anime`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  }, []);

  const sortResult = () => {
    setSearchBar(searchBar.sort());
  };

  const onPressGenre = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            {/* search bar -----------------------------------------*/}
            <TextInput
              style={{
                width: 200,
                borderColor: "orange",
                borderWidth: 2,
                padding: 5,
              }}
              placeholder="search..."
              onChangeText={(text) => setKeyWord(text)}
            />
            <Button
              title="Search by Name"
              onPress={getSearchBar}
              color="orange"
            />
          </View>
          {/* suggestions ------------------------------------------*/}
          <View>
            <Text>Suggestions</Text>
            <Button title="doraemon" onPress={getDoraemon} />
            <Button title="Yaiba" onPress={getYaiba} />
          </View>
          {/* Gernes -----------------------------------------------*/}
          <View>
            <Text>Genres</Text>
            <FlatList
              data={genres.slice(0, 19)}
              keyExtractor={(item) => item.mal_id}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                  // activeOpacity={0.5}
                  // onPress={fetch(
                  //   `https://api.jikan.moe/v3/search/anime?genre=${item.mal_id}`
                  // )
                  //   .then((response) => response.json())
                  //   .then((data) => {
                  //     setGenre(data.results), setText("Results for:");
                  //   })
                  //   .catch((err) => console.log("something went wrong", err))}
                  >
                    <Text>{item.name}</Text>
                    <FlatList
                      data={genre}
                      keyExtractor={(item) => item.mal_id}
                      renderItem={({ item }) => (
                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {item.title}
                          </Text>
                          <Image
                            style={styles.pictures}
                            source={{ uri: image_url }}
                          />
                        </View>
                      )}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          {/* search results ---------------------------------------*/}

          <View>
            <Text>{text}</Text>
            {/* <Button title="sort" onPress={() => sortResult()} /> */}
            <DataTable style={{ paddingHorizontal: 20 }}>
              <DataTable.Header>
                <DataTable.Title>Anime</DataTable.Title>

                <DataTable.Title numeric>Score</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <FlatList
                  data={searchBar}
                  keyExtractor={(item) => item.mal_id}
                  renderItem={({ item }) => (
                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                      {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Image
                    style={styles.pictures}
                    source={{ uri: item.images.webp.image_url }}
                  /> */}
                      {/* <View>{item.title}</View>
                      <View style={styles.rows}> {item.score}</View>
                      <View style={styles.pictures}>
                        {" "}
                        <Image
                          style={styles.pictures}
                          source={{ uri: item.images.webp.image_url }}
                        />
                      </View> */}
                      <DataTable.Cell>{item.title}</DataTable.Cell>
                      <DataTable.Cell numeric style={styles.rows}>
                        {item.score}
                      </DataTable.Cell>

                      <Image
                        style={styles.pictures}
                        source={{ uri: item.images.webp.image_url }}
                      />
                    </View>
                  )}
                />
              </DataTable.Row>
            </DataTable>
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
  },
  pictures: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  rows: {},
});
