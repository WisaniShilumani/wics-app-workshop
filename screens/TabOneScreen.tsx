import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import firebase from "firebase";

import { Text, View } from "../components/Themed";
import PrettyMessage from "../components/pretty-message";

const TabOneScreen = () => {
  // 1. Component Mounts; 2. Components Updates; 3. Component Unmount
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any);
  const [loaded, setLoaded] = useState(false);

  const x = "";
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
        <Image
          source={{
            uri:
              "https://media.istockphoto.com/vectors/yoga-different-people-vector-id1166219231?k=6&m=1166219231&s=612x612&w=0&h=BXil_lf2N2GXl_vPx04QCz4i7Xx90Z8SKy6cLq4yD_M=",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>What are you grateful for today</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a message"
          onChangeText={setMessage}
          value={message}
        />
        <Button title="Submit" onPress={handleSubmitMessage} />

        <Text>Messages:</Text>
        {messages.map((currMessage: any) => (
          <PrettyMessage
            text={currMessage.text}
            date={currMessage.timestamp.toString()}
          />
        ))}
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
  image: {
    height: 300,
    width: "100%",
  },
});
