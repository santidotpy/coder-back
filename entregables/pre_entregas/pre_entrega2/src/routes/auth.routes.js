import { Router } from "express";

const routerAuth = Router();

routerAuth.get("/signup", (req, res) => {
  res.render("auth/signup");
});

routerAuth.post("/signup", (req, res) => {
  res.send("signup");
});

routerAuth.get("/login", (req, res) => {
  res.render("auth/login");
});

routerAuth.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "mail@mail.com" && password === "password123") {
    // if user is logged in

    //req.session.login = true;
    res.redirect("../api/products");
  } else {
    // if user is not logged in
    res.render("auth/login");
  }
});

routerAuth.get("/logout", (req, res) => {
  // if (req.session.login) {
  //   req.session.destroy(() => {
  //     res.redirect("api/login");
  //   });
  // }
  res.send("logout");
});

export default routerAuth;
