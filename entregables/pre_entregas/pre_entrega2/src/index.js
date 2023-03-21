import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./path.js";
import path, { format } from "path";

import { ProductMongo } from "./dao/MongoDB/models/Product.js";
import routerProd from "./routes/products.routes.js";

// inicializaciones
const app = express();
//const managerProduct = new ProductMongo();

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

  
});

app.use("/api", routerProd);
