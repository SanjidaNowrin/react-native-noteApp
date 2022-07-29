import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "./../components/Input";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../App";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // signUp navigate function
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  // login function
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("signed in successfully", res);
      })
      .catch((err) => {
        console.log("error signing in", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Image
        source={require("../../assets/signIn.png")}
        style={{ alignSelf: "center" }}
      /> */}
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Never Forget your notes
      </Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          autoCapitalize={"none"}
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.signUp}>
        <Button
          onPress={login}
          title={"Login"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
        />
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text>
            Don't have an account?
            <Text style={{ color: "green", fontWeight: "bold" }}>SignUp</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
  },
  signUp: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
