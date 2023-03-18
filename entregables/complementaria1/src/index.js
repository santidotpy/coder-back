import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./path.js";
import path, { format } from "path";

//import { getManagerMessage } from "./dao/daoManager.js";
import { MessageMongo } from "./dao/MongoDB/models/Message.js";
import routerMsg from "./routes/msg.routes.js";

// inicializaciones
const app = express();
const managerMessage = new MessageMongo();

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// socekts
const server = app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("New connection:", socket.id);

  socket.on("message", async (info) => {
    const data = await getManagerMessage();
    const managerMessage = new data.ManagerMessageMongoDB();
    managerMessage.addElements([info]).then(() => {
      managerMessage.getElements().then((mensajes) => {
        console.log(mensajes);
        socket.emmit("allMessages", mensajes);
      });
    });
  });

  socket.on("chat-message", async (data) => {
    // console.log(data);
    //save to db
    managerMessage.addElements([
      { username: data.username, message: data.message, email: data.email },
    ]);
    io.sockets.emit("chat-message", data);
  });

  socket.on("chat-typing", (data) => {
    socket.broadcast.emit("chat-typing", data);
  });
});

app.use(routerMsg);
