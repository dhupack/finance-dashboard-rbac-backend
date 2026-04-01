import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.send("Server is running");
});

export default app;
