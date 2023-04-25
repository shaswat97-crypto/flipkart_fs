import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Product } from "../models.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};

export const addNewPorduct = async (req, res) => {
  await Product.create(req.body);

  res.status(200).send("Product added successfully");
};

export const getProductsAdmin = async (req, res) => {
  const products = await Product.find();

  res.status(200).send(products);
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    res.status(200).send(product);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ _id: id });

    res.status(200).send(product);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const product = await Product.findOneAndUpdate({ _id: id, obj });

    res.status(200).send(product);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};
