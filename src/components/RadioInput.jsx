import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function RadioInput({ label, value, setValue, size = "big" }) {
  const isSelected = value === label;
  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.container}>
        <View
          style={[
            styles.outerCircle,
            isSelected && styles.selectedOuterCircle,
            size === "big" && styles.bigOuterCircle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCircle,
              size === "big" && styles.bigInnerCircle,
            ]}
          ></View>
        </View>
        <Text style={{ marginLeft: 10, fontWeight: "bold" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
  selectedOuterCircle: {
    borderColor: "orange",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
  bigOuterCircle: {},
  bigInnerCircle: {},
});
