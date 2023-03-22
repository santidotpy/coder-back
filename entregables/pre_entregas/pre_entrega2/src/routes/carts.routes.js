import { Router } from "express";
import { CartMongo } from "../dao/MongoDB/models/Cart.js";

const managerCart = new CartMongo();

const routerCart = Router();

routerCart.get("/carts", (req, res) => {
  res.render("index");
});

routerCart.get("/carts/:cid", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 8;
  const sort = req.query.sort || "asc";
  const cartId = req.params.cid;
  const carts = await managerCart.getElementById(cartId);
  console.log(carts);
  res.render("cart/cart", {
    title: "Carts",
    carts: carts.products,
    // pagination: carts.pagination,
    // currentPage: carts.page,
    // totalPages: carts.totalPages,
  });
});

// agregar productos al carrito
routerCart.post("/carts", async (req, res) => {
    const cart = req.body; // array of products
    console.log(cart);
    const newCart = await Promise.all(
        cart.map(async (cart) => {
            const {
                products,
            } = cart;
            const newCart = await managerCart.addElements({
                products,
            });
            return newCart;
        })
    );
    console.log(newCart);
    res.render("cart/cart", {
        title: "Carts",
        carts: JSON.stringify(newCart),
    });
});

// put para actualizar productos del carrito
routerCart.put("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const cart = req.body;
    const updatedCart = await managerCart.updateElement(cartId, cart);
    console.log(updatedCart);
    res.render("cart/cart", {
        title: "Carts",
        carts: JSON.stringify(updatedCart),
    });
});


export default routerCart;
