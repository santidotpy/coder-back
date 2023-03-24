import { Router } from "express";

const routerAuth = Router();

routerAuth.get("/signup", (req, res) => {
  res.render("auth/signup");
});

routerAuth.get("/login", (req, res) => {
  res.render("auth/login");
});

export default routerAuth;
