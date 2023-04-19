import express from "express";
import { authenticateToken } from "../auth.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js";

const router = express.Router();

export default router
  .post("/", authenticateToken, addToCart)
  .get("/", authenticateToken, getCart);
