import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";
import Input from "./../components/Input";
import RadioInput from "../components/RadioInput";

const noteColorOption = ["red", "blue", "green"];

export default function Update({ navigation, route, user }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: "note created successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
      />

      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select Text Color</Text>
      </View>
      {noteColorOption.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Update"
          customStyles={{
            marginTop: 25,
            alignSelf: "center",
            width: "100%",
          }}
          onPress={onPressUpdate}
        />
      )}
    </SafeAreaView>
  );
}
