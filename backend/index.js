import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import adminAuthRouter from "./routes/admin.auth.routes.js";
import userAuthRouter from "./routes/user.auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log("Failed to connect to db :", err));

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)))
  .use("/api/admin", adminAuthRouter)
  .use("/api/user", userAuthRouter)
  .use("/api/products", productRouter)
  .use("/api/cart", cartRouter)
  .use("/api/admin", adminAuthRouter)
  .use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

app.listen(process.env.PORT, () =>
  console.log("Server started at", process.env.PORT)
);
