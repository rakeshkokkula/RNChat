import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";


// import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <View className="messageContainer justifyEnd">
          <Text className="sentText pr-10">{trimmedName}</Text>
          <View className="messageBox backgroundBlue">
            <Text className="messageText colorWhite">{text}</Text>
          </View>
        </View>
        )
        : (
          <View className="messageContainer justifyStart">
            <View className="messageBox backgroundLight">
              <Text className="messageText colorDark">{text}</Text>
            </View>
            <Text className="sentText pl-10 ">{user}</Text>
          </View>
        )
  );
}

export default Message;