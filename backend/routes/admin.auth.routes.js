import express from "express";
import {
  adminSignup,
  adminLogin,
} from "../controller/admin.auth.controller.js";

const router = express.Router();

export default router
  .post("/signup", adminSignup)
  .post("/login", adminLogin);
