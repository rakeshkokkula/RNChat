import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import pino from "pino";

let socket;

const Chat = (props) => {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setID] = useState("");
  //   const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://192.168.0.9:5000/";
  socket = io(ENDPOINT);
  const LOGGER = pino({ level: process.env.LOG_LEVEL || "info" });

  socket.on("connect", () => {
    console.log("socket.connected");
  });

  useEffect(() => {
    const { username, room, id } = props.route.params;
    console.log(id, username, room);
    setUserName(username);
    setRoom(room);
    setID(id);
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      console.log(message, "added");
    });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: Math.floor(Math.random(10) * 1000000),
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: Math.floor(Math.random(10) * 1000000),
          username: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const sendMessage = (message) => {
    if (message) {
      console.log("sending", message);
      socket.emit("sendMessage", message[0], () => setMessage(""));
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => sendMessage(message)}
      inverted={false}
      alwaysShowSend={true}
      isTyping={false}
      user={{
        _id: id,
        room: room,
        username: username,
      }}
    />
  );
};

export default Chat;
