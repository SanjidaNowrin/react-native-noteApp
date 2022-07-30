import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../App";
import Button from "../components/Button";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../App";
import RadioInput from "../components/RadioInput";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //create the query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    //create listener to listen the query that we just made
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setLoading(false);
    });
    return notesListenerSubscription;
  }, []);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;

    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
      >
        {/* <View style={{ display: "flex", flexDirection: " row" }}> */}
        {/* delete */}
        <Pressable
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id));
          }}
          style={{ position: "absolute", alignSelf: "flex-end", padding: 15 }}
        >
          <AntDesign name="delete" size={24} color="red" />
        </Pressable>
        {/* edit */}
        <Pressable
          onPress={() => {
            navigation.navigate("Update", { item });
          }}
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            padding: 15,
            marginTop: 45,
          }}
        >
          <Entypo name="edit" size={24} color="black" />
        </Pressable>
        {/* </View> */}
        <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
        <Text style={{ color: "white", fontSize: 18, marginTop: 16 }}>
          {description}
        </Text>
      </Pressable>
    );
  };
  console.log("notes", notes);
  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>My Notes</Text>

        <Button title="Logout" onPress={handleLogout} />
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}
