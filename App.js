import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import SignIn from "./src/screens/signin";
import { initializeApp } from "firebase/app";
import Edit from "./src/screens/edit";
import Create from "./src/screens/create";
import SignUp from "./src/screens/signup";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD5Bi2FwLuS3ATDC3ufcFD35oEtZu9aB8",
  authDomain: "note-app-native-e90f2.firebaseapp.com",
  projectId: "note-app-native-e90f2",
  storageBucket: "note-app-native-e90f2.appspot.com",
  messagingSenderId: "168461088581",
  appId: "1:168461088581:web:47c52fb44271bee433302c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// defaultTheme change
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();
export default function App() {
  const user = false;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
