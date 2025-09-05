import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});