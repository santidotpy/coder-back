import { Router } from "express";

const routerMsg = Router();

routerMsg.get("/", (req, res) => {
  res.render("index");
});

routerMsg.get("/chat", (req, res) => {
  res.render("chat");
});

export default routerMsg;

