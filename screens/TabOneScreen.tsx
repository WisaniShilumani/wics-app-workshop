import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";

const TabOneScreen = () => {
  const [message, setMessage] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you grateful for today</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a message"
        onChangeText={setMessage}
        value={message}
      />
      <Text>{message}</Text>
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    padding: 16,
    backgroundColor: "#f5f4f8",
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    marginTop: 32,
  },
});
