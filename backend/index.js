import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import adminAuthRouter from "./routes/admin.auth.routes.js";
import userAuthRouter from "./routes/user.auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log("Failed to connect to db :", err));

const app = express();

app
  .use(express.json())
  .use("/admin", adminAuthRouter)
  .use("/user", userAuthRouter)
  .use("/products", productRouter)
  .use("/cart", cartRouter)
  .use("/admin", adminAuthRouter);

app.listen(process.env.PORT, () => console.log("Server started at", process.env.PORT));
