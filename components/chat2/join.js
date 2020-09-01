import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Socket } from "socket.io-client";

export default function Join({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <View>
      <View style={{ marginTop: 50 }}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="username"
            type="text"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("users", {
              username: username,
              id: Socket.id,
            })
          }
        >
          <Text style={styles.title}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff",
  },
  input: {
    width: 300,
    alignSelf: "center",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  btn: {
    backgroundColor: "coral",
    padding: 10,
    width: 300,
    alignSelf: "center",
  },
});
