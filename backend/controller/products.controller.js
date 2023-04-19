import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Product } from "../models.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const addNewPorduct = async (req, res) => {
  await Product.create(req.body);

  res.status(200).send("Product added successfully");
};

export const getProductsAdmin = async (req, res) => {
  const products = await Product.find();

  res.status(200).send(products);
};
