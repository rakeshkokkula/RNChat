const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const rabbit = require("amqplib/callback_api");
const pino = require("pino");
// require('dotenv').config();

const LOGGER = pino({ level: process.env.LOG_LEVEL || "info" });
const queues = ["messages", "frontendMessage"];

const {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getUsersInRoom,
} = require("./users");

const router = require("./router");
LOGGER.info("Starting server");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

LOGGER.info(`Connecting to RabbitMQ`);
rabbit.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  LOGGER.info("Creating default channel on default exchange");
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    rabbit.channel = channel;

    LOGGER.info("Creating queues on channel");
    queues.forEach((queue) => {
      channel.assertQueue(queue, {
        durable: false,
      });
      LOGGER.info(`Created ${queue} on channel`);
    });

    channel.send = (queue, message) => {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    };

    LOGGER.info("Attaching consumers...");
    channel.consume(
      "messages",
      (event) => {
        LOGGER.info("consume...");
        let resData = JSON.parse(event.content.toString());
        LOGGER.info(resData);
        io.to(resData.socketId).emit(resData.type, resData.res);
      },
      {
        noAck: true,
      }
    );

    LOGGER.info("All consumers ready");
  });
});

io.on("connect", (socket) => {
  socket.on("join", ({ username }, callback) => {
    const { error, user } = addUser({ id: socket.id, username });
    if (error) return callback(error);
    LOGGER.debug(`New user ${username} connected with socket id ${socket.id}`);
    // socket.join(user.room);
    socket.broadcast.emit("roomData", {
      users: getUsers(),
    });

    callback();
  });

  // socket.on("join", ({ username }, callback) => {
  //   // const { error, user } = addUser({ id: socket.id, username });
  //   // socket.join("123");
  //   if (error) return callback(error);
  //   LOGGER.debug(`New user ${username} connected with socket id ${socket.id}`);
  //   socket.join(user);
  //   socket.broadcast.emit("roomData", {
  //     users: getUsers(),
  //   });

  //   callback();
  // });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(message);
    const mess = message;

    if (mess) {
      rabbit.channel.send("messages", JSON.stringify(mess));
      io.to(mess.user.room).emit("message", message);
      console.log(mess.user.room);
    } else {
      // console.log("something went wrong")
      LOGGER.error(`something went wrong`);
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      LOGGER.debug(`User disconnected ${socket.id}`);
      io.to(user.room).emit("message", {
        _id: uuidv4(),
        user: { name: "admin" },
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started on 5000.`)
);
