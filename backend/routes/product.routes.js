import express from "express";
import {
  authenticateToken,
  authenticateAdminToken,
} from "../auth.middleware.js";
import {
  getProducts,
  addNewPorduct,
  getProductsAdmin,
  getProductById,
  deleteProduct,
  updateProduct
} from "../controller/products.controller.js";

const router = express.Router();

export default router
  .get("/", authenticateToken, getProducts)
  .post("/", authenticateAdminToken, addNewPorduct)
  .get("/", authenticateAdminToken, getProductsAdmin)
  .get("/:id", authenticateToken, getProductById)
  .delete('/:id', authenticateAdminToken, deleteProduct)
  .patch("/:id", authenticateAdminToken, updateProduct)
  
