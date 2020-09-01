import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Socket } from "socket.io-client";

export default function SignIn({navigation}) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <View>
      <View style={{ marginTop: 50 }}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            type="text"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Room"
            type="text"
            onChangeText={(value) => setRoom(value)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('chat', {name:name, room:room, id: Socket.id})}>
          <Text style={styles.title}>Sign In</Text>
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
