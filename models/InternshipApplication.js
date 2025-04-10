// backend/models/InternshipApplication.js

import mongoose from "mongoose";

const InternshipApplicationSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  phone: String,
  message: String,
  internshipTitle: String,
  resumeName: String,
  resumeData: Buffer, // Optional if you want to store file content
}, { timestamps: true });

export default mongoose.model("InternshipApplication", InternshipApplicationSchema);
