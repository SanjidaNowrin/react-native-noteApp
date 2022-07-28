import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "./../components/Input";

export default function SignIn({ navigation }) {
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
        <Input placeholder="Email Address" />
        <Input placeholder="Password" secureTextEntry />
      </View>
      <View style={styles.signUp}>
        <Button
          title={"Login"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
        />
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Don't have an account?
            <Text style={{ color: "green", fontWeight: "bold" }}>SignUp</Text>
          </Text>
        </Pressable>
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
