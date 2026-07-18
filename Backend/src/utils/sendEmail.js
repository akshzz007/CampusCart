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
  await transporter.sendMail({
    from: `"CampusCart" <akshras479@gmail.com>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });
};

export default sendEmail;