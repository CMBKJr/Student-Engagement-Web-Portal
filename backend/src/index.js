import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import milestoneRoutes from './routes/milestoneRoutes'

dotenv.config();

// app setup
const app = express();

// Database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// api home page
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the backend'})
})

// routes mounting
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// ports
const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
