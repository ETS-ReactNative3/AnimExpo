import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

export default function Search({ navigation, route }) {
  const [keyword, setKeyWord] = useState("");
  const [searchBar, setSearchBar] = useState([]);
  const [text, setText] = useState("");
  const [genres, setGenres] = useState([]);
  const [genresResult, setGenresResult] = useState([]);
  const [id, setId] = useState("");

  const getSearchBar = (keyword) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchBar(data.data);
        setText("Results for [" + keyword + "]:");
        setId(data.data.mal_id);
        setGenresResult([]);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  const fetchGenres = () => {
    fetch("https://api.jikan.moe/v4/genres/anime")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const getAniByGenres = (idGenre) => {
    console.log(idGenre);
    fetch(`https://api.jikan.moe/v4/anime?genres=${idGenre}`)
      .then((response) => response.json())
      .then((data) => {
        setGenresResult(data.data);
        setSearchBar([]);
        setKeyWord("");
        setText("");
      })
      .catch((err) => Alert.alert("something went wrong", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <View
              style={{
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 20,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Button
                title="Go back"
                onPress={() => navigation.goBack()}
                containerStyle={styles.containerStyleButton}
                titleStyle={styles.titleStyleButton}
                buttonStyle={{
                  backgroundColor: "#b5b5cf",
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 0,
                  marginRight: 20,
                }}
              />
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
                  marginRight: 0,
                }}
              />
            </View>
            {/* suggestions ------------------------------------------*/}
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 20,
              }}
            >
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
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 20,
                padding: 10,
              }}
            >
              <Text style={styles.heading}>Genres</Text>
              <FlatList
                data={genres.slice(0, 19)}
                keyExtractor={(item) => item.mal_id}
                contentContainerStyle={styles.contentContainerStyle}
                renderItem={({ item }) => (
                  <View>
                    <Button
                      title={item.name}
                      containerStyle={styles.containerStyleButton}
                      titleStyle={styles.titleStyleButton}
                      buttonStyle={styles.buttonStyleButton}
                      onPress={() => getAniByGenres(item.mal_id)}
                      // onPress={item.mal_id}
                    />
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
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <StatusBar style="auto" />
          </View>
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
  heading: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerStyleButton: {
    height: 50,
    alignItems: "center",
  },
  titleStyleButton: {
    color: "black",
    fontSize: 12,
  },
  buttonStyleButton: {
    backgroundColor: "#e6e3e8",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  result: {
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    marginTop: 2,
  },
  flatlist: {
    marginTop: 2,
    marginBottom: 2,
    width: "90%",
    marginLeft: 18,
    marginRight: 10,
  },
  flatListView: {
    marginTop: 5,
    marginBottom: 5,
    flexWrap: "wrap",
    backgroundColor: "#e6e3e8",
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    padding: 5,
    height: 270,
  },
  pictures: {
    width: 130,
    height: 80,
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
