import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";

const TabOneScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["message 1", "message 2"]);

  const handleAddMessage = (newMessage: string) => {
    setMessages([...messages, newMessage]);
  };

  const handleSubmitMessage = () => {
    handleAddMessage(message);
    Alert.alert(`Your message has been saved! Well done. ${message}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you grateful for today</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a message"
        onChangeText={setMessage}
        value={message}
      />
      <Button title="Submit" onPress={handleSubmitMessage} />

      <Text>Messages:</Text>
      <Text>{JSON.stringify(messages, null, 2)}</Text>
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
