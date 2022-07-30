import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "./../components/Input";
import RadioInput from "./../components/RadioInput";
import Button from "./../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

// color array
const noteColorOption = ["red", "blue", "green"];
export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  console.log(noteColor);

  //Submit function
  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
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
      <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
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
          title="submit"
          customStyles={{
            marginTop: 25,
            alignSelf: "center",
            width: "100%",
          }}
          onPress={onPressCreate}
        />
      )}
    </SafeAreaView>
  );
}
