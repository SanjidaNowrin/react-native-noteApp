import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "./../components/Input";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// firebase
const auth = getAuth();

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  // function
  const signUp = () => {
    // create a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user created", user);
        // then we create user profile in the database
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Never Forget your notes
      </Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Input placeholder="Full Name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        {/* radio button */}
        <View style={{ marginVertical: 20 }}>
          <Text>Select Gender</Text>
        </View>
        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioContainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
        {/*         
        <Pressable style={styles.radioContainer}>
          <View
            style={[styles.outerCircle, selected && styles.selectedOuterCircle]}
          >
            <View
              style={[
                styles.innerCircle,
                selected && styles.selectedInnerCircle,
              ]}
            />
          </View>
          <Text style={styles.radioText}>Female</Text>
        </Pressable> */}
      </View>
      <View style={styles.signUp}>
        <Button
          onPress={signUp}
          title={"SignUp"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
        />
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text>
            Already have an account?
            <Text style={{ color: "green", fontWeight: "bold" }}>SignIn</Text>
          </Text>
        </Pressable>
      </View>
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
