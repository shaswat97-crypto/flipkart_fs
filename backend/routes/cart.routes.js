import express from "express";
import { authenticateToken } from "../auth.middleware.js";
import { addToCart, getCart, decQty, incQty, deleteCart } from "../controller/cart.controller.js";

const router = express.Router();

export default router
  .post("/", authenticateToken, addToCart)
  .get("/", authenticateToken, getCart)
  .post("/decQty", authenticateToken, decQty)
  .post("/incQty", authenticateToken, incQty)
  .post("/delete", authenticateToken, deleteCart);

