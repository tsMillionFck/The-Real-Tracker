import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import authRoutes from "./routes/auth.js";
import trackerRoutes from "./routes/tracker.js";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "..", ".env") });

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:3000",
  "https://the-real-tracker-psi.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(
    `[CORS Debug] Request from origin: ${origin} | Method: ${req.method} | Path: ${req.path}`
  );
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log(`[CORS Blocked] Origin not in allowed list: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Explicitly handle pre-flight for all routes
app.options("*", cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tracker", trackerRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// Catch-all route for debugging
app.use((req, res) => {
  console.log(`[404 Debug] Unhandled request: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Route not found" });
});

export default app;
