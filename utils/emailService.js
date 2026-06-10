import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 1. Create the Transporter
// 1. Create the Transporter using the built-in Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  }
});

// 2. Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Service Error:", error.message);
  } else {
    console.log("✅ Email Service Ready");
  }
});

/**
 * Reusable function to send emails
 * @param {string} to - The recipient's email address
 * @param {string} subject - Email Subject
 * @param {string} html - HTML Content of the email
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bijay Kumar Behera" <${process.env.SMTP_USER}>`, 
      to: to, // Now it dynamically sends to whoever we pass in!
      subject: subject,
      html: html,
    });

    console.log(`📩 Email Sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    return false;
  }
};