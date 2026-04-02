
import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/user.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { swaggerUi, swaggerSpec } from "./config/swagger.js";

// Load environment variables
dotenv.config();

const app = express();


// Rate limiting middleware (e.g., 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Middleware
app.use(express.json());

// Swagger API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User routes
app.use("/api/users", userRoutes);

// Record routes
app.use("/api/records", recordRoutes);


// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.send("Server is running");
});

export default app;
