import { Router } from "express";

const routerMsg = Router();

routerMsg.get("/", (req, res) => {
  res.send("Hello World!");
});

export default routerMsg;
