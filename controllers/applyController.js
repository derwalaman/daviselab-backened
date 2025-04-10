// backend/controllers/internshipController.js
import nodemailer from "nodemailer";
import { google } from "googleapis";
import InternshipApplication from "../models/InternshipApplication.js";

const OAuth2 = google.auth.OAuth2;

export const handleInternshipApplication = async (req, res) => {
  try {
    const { name, email, phone, message, internshipTitle } = req.body;
    const resume = req.file;

    console.log("Application received:", {
      name,
      email,
      phone,
      message,
      internshipTitle,
      resumeName: resume?.originalname,
    });

    // ✅ 1. Check if already applied
    const existingApplication = await InternshipApplication.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for an internship.",
      });
    }

    // ✅ 2. Save to DB
    const newApplication = new InternshipApplication({
      name,
      email,
      phone,
      message,
      internshipTitle,
      resumeName: resume?.originalname,
      resumeData: resume?.buffer,
    });

    await newApplication.save();

    // ✅ 3. OAuth setup
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    // ✅ 4. Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // ✅ 5A. Email to applicant
    const userMailOptions = {
      from: `"DAVISE Lab, NIT Delhi" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Your Application Has Been Received - DAVISE Lab",
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for applying for the <strong>${internshipTitle}</strong> position at <strong>DAVISE Lab, NIT Delhi</strong>.</p>
        <p>We have received your application and our team will get back to you shortly after reviewing it.</p>
        <p><strong>Your Details:</strong><br/>
        Email: ${email}<br/>
        Phone: ${phone}<br/>
        Message: ${message}</p>

        <hr/>
        <p style="color: #555">
          <strong>About DAVISE Lab:</strong><br/>
          DAVISE (Data Analytics, Vision, and Intelligent Systems Engineering) Lab at NIT Delhi focuses on cutting-edge research in AI, Computer Vision, and IoT. 
          We foster a culture of innovation, learning, and impactful real-world applications.
        </p>

        <p>Best regards,<br/>
        <strong>DAVISE Lab Team</strong><br/>
        NIT Delhi</p>
      `,
    };

    // ✅ 5B. Email to admin
    const adminMailOptions = {
      from: `"DAVISE Lab Website" <${process.env.SENDER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // put your admin email here
      subject: `New Internship Application from ${name}`,
      html: `
        <h3>New Internship Application Received</h3>
        <p><strong>Internship Title:</strong> ${internshipTitle}</p>
        <p><strong>Name:</strong> ${name}<br/>
           <strong>Email:</strong> ${email}<br/>
           <strong>Phone:</strong> ${phone}<br/>
           <strong>Message:</strong> ${message}</p>
        <p>The resume is attached.</p>
      `,
      attachments: resume
        ? [
          {
            filename: resume.originalname,
            content: resume.buffer,
          },
        ]
        : [],
    };

    // ✅ 6. Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully and emails sent.",
    });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
