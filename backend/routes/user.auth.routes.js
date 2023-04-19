import express from "express";
import { userSignup, userLogin } from "../controller/user.auth.controller.js";

const router = express.Router();

export default router
  .post("/signup", userSignup)
  .post("/login", userLogin);
