import nodemailer from "nodemailer";
import { EMAIL_PASSOWRD, EMAIL_USER_NAME } from "../config/env.js";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER_NAME,
        pass: EMAIL_PASSOWRD,
      },
    });

    const mailOptions = {
      from: EMAIL_USER_NAME,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};
