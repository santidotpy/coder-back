import express from "express";
import dotenv from "dotenv";
import { getManagerMessage } from "./dao/daoManager";
import { Socket } from "socket.io";
// import { MessageMongo } from "./dao/MongoDB/models/Message";

const app = express();
const managerMessage = new getManagerMessage();
// const messageMongo = new MessageMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = Socket(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", async (data) => {
    await managerMessage.addElements([data]);
    const messages = await managerMessage.getElements();
    io.sockets.emit("all-messages", messages);
  });

  // socket.on("message", (data) => {
  //     managerMessage.addElements([data]).then(() => {
  //         managerMessage.getElements().then((messages) => {
  //             io.sockets.emit("all-messages", messages);
  //         }
  //         );
  // });
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
