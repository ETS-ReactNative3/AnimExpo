import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

export default function Search({}) {
  const [aniAll, setAniAll] = useState([]);
  const [id, setId] = useState("");

  const getAniAll = () => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => response.json())
      .then((data) => setAniAll(data.data))
      .catch((err) => Alert.alert("something went wrong", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={aniAll}
          keyExtractor={(item) => item.mal_id}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                abc{item.title}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
