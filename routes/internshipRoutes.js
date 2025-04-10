// backend/routes/internshipRoutes.js
import express from "express";
import formidable from "formidable";
import path from "path";
import fs from "fs";

const router = express.Router();

// POST /api/internship/apply
router.post("/apply", async (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "backend", "uploads"),
    keepExtensions: true,
    multiples: false,
  });

  // Make sure the uploads folder exists
  const uploadPath = path.join(process.cwd(), "backend", "uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const { name, email, phone, message } = fields;
    const resume = files.resume;

    if (!resume) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    // Rename the file to original name
    const oldPath = resume[0].filepath;
    const newPath = path.join(uploadPath, resume[0].originalFilename);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error saving file:", err);
        return res.status(500).json({ error: "Error saving file" });
      }

      return res.status(200).json({ message: "Application submitted successfully!" });
    });
  });
});

export default router;
