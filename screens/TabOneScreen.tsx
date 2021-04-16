import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, TextInput } from "react-native";
import firebase from "firebase";

import { Text, View } from "../components/Themed";
import PrettyMessage from "../components/pretty-message";

const TabOneScreen = () => {
  // 1. Component Mounts; 2. Components Updates; 3. Component Unmount
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any);
  const [loaded, setLoaded] = useState(false);

  const handleLoadMessages = () => {
    firebase
      .firestore()
      .collection("/messages")
      .get()
      .then((snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(loadedMessages);
        setLoaded(true);
      });
  };

  useEffect(() => {
    handleLoadMessages();
  }, []);

  const handleAddMessage = (newMessage: string) => {
    // firebase.firestore
    // firebase.firestore()
    if (!newMessage.length) {
      alert("Add a message bru");
      return null;
    }

    firebase
      .firestore()
      .collection("/messages")
      .add({
        text: newMessage,
        timestamp: new Date(),
        person: "Wisani Shilumani",
        tags: ["#gratitude", "#friday"],
      });
    setMessages([...messages, newMessage]);
  };

  const handleSubmitMessage = () => {
    handleAddMessage(message);
  };

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
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
        {messages.map((currMessage) => (
          <PrettyMessage text="Default text" date="some date" />
        ))}

        <Text>{JSON.stringify(messages, null, 2)}</Text>
      </View>
    </ScrollView>
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
