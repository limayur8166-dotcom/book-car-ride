import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/venderRoute.js";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🔥 Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://rent-a-ride-two.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// 🔥 API ROUTES FIRST
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/vendor", vendorRoute);

// 🔥 Cloudinary
app.use("*", cloudinaryConfig);

// 🔥 SERVE FRONTEND (VERY IMPORTANT)
app.use(express.static("public"));

// 🔥 CATCH ALL (React routing fix)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// 🔥 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(port, () => {
      console.log(`Server running on port ${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error("MongoDB error ❌", error);
  });

// 🔥 Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});