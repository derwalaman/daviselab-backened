import express from "express";
import multer from "multer";
import { handleInternshipApplication } from "../controllers/applyController.js";

const router = express.Router();

// Set up file upload (using multer for resume)

console.log("Setting up multer for file upload...");
const storage = multer.memoryStorage(); // stores file in memory (or use diskStorage if saving)
const upload = multer({ storage });

router.post("/", upload.single("resume"), handleInternshipApplication);

export default router;
