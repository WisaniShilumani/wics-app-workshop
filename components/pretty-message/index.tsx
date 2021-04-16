import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrettyMessage = ({ text, date }: any) => {
  return (
    <View style={styles.container}>
      <Text>{text}...</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default PrettyMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginVertical: 8,
  },
  date: {
    fontSize: 8,
    marginTop: 8,
  },
});
