socket.on("login", (data) => {
  connected = true;
  // Display the welcome message
  var message = "Welcome to Socket.IO Chat – ";
  log(message, {
    prepend: true,
  });
  addParticipantsMessage(data);
});

// Whenever the server emits 'new message', update the chat body
socket.on("new message", (data) => {
  addChatMessage(data);
});

// Whenever the server emits 'user joined', log it in the chat body
socket.on("user joined", (data) => {
  log(data.username + " joined");
  addParticipantsMessage(data);
});

// Whenever the server emits 'user left', log it in the chat body
socket.on("user left", (data) => {
  log(data.username + " left");
  addParticipantsMessage(data);
  removeChatTyping(data);
});

// Whenever the server emits 'typing', show the typing message
socket.on("typing", (data) => {
  addChatTyping(data);
});

// Whenever the server emits 'stop typing', kill the typing message
socket.on("stop typing", (data) => {
  removeChatTyping(data);
});

socket.on("disconnect", () => {
  log("you have been disconnected");
});

socket.on("reconnect", () => {
  log("you have been reconnected");
  if (username) {
    socket.emit("add user", username);
  }
});

socket.on("reconnect_error", () => {
  log("attempt to reconnect has failed");
});
