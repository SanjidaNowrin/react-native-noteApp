import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "./../components/Input";
import Button from "../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";
import RadioInput from "./../components/radio-input";
// color option
const noteColorOptions = ["red", "blue", "green"];

export default function Update({ navigation, route, user }) {
  // params
  const noteItem = route.params.item;
  console.log(noteItem.color);
  // state
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  // function
  const onPressUpdate = async () => {
    setLoading(true);
    try {
      setLoading(false);
      showMessage({
        message: "Note Updated successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (err) {
      console.log("error", err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
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
        <Text>Select Your Note Color</Text>
      </View>
      {/* color map */}
      {noteColorOptions.map((option, index) => (
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
          customStyles={{ marginTop: 60, alignSelf: "center", width: "100%" }}
          onPress={onPressUpdate}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  signUp: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  radioText: {
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
