import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  try {
    console.log("Connecting Brevo...");

    const info = await transporter.sendMail({
      from: `"CampusCart" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    console.log("MAIL SENT ✅");
    console.log(info);

  } catch (err) {
    console.log("BREVO ERROR ❌");
    console.log(err);
    throw err;
  }
};

export default sendEmail;