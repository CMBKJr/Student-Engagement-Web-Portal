import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import participationRoutes from "./routes/participationRoutes.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
// import milestoneRoutes from './routes/milestoneRoutes.js'

dotenv.config();

// app setup
const app = express();

// Database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// api home page
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the backend" });
});

// routes mounting
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/participate", participationRoutes);

// test
app.get("/decode-cookie", (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.json({ message: "No cookie found" });
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    res.json({ decoded });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ports
const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
