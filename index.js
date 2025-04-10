// index.js (or wherever your entry point is)

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import applyRoutes from "./routes/applyRoutes.js"; // ✅ import your routes
import contactRoutes from "./routes/contact.routes.js"; // ✅ import your routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Routes
app.use("/api/apply", applyRoutes);

app.use('/api/contact', contactRoutes);

// ✅ call DB connection before starting server
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("🚀 Server running at http://localhost:5001");
  });
});