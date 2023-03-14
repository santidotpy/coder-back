import { Router } from "express";

const routerMsg = Router();

routerMsg.get("/", (req, res) => {
  res.render("index");
});

export default routerMsg;

