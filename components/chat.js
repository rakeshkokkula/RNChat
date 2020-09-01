import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import pino from "pino";

let socket;

const Chat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setID] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://192.168.0.9:5000/";
  socket = io(ENDPOINT);
  const LOGGER = pino({ level: process.env.LOG_LEVEL || "info" });

  socket.on("connect", () => {
    console.log("socket.connected");
  });

  useEffect(() => {
    const { name, room, id } = props.route.params;

    setRoom(room);
    setName(name);
    const _idd = Math.floor(Math.random(10) * 1000000);
    setID(_idd);

    socket.emit("join", { name, room, id }, (error) => {
      if (error) {
        alert(error);
      } else {
        console.log(name, room, id);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      console.log(message, "added");
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users);
    });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: Math.random(),
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: Math.random(),
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        sent: true,
      },
    ]);
  }, []);

  const sendMessage = (messages) => {
    if (messages) {
      console.log(messages);
      socket.emit("sendMessage", messages[0], () => setMessage(""));
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => sendMessage(messages)}
      inverted={false}
      alwaysShowSend={true}
      isTyping={false}
      user={{
        _id: id,
        room: room,
        name: name,
      }}
    />
  );
};

export default Chat;
