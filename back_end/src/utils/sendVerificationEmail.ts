// src/utils/sendVerificationEmail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",

  port: 2525,

  auth: {
    user: "f78e61b5ec375d",

    pass: "e481339c952eea",
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  const verificationLink = `${process.env.FRONTEND_URL}/verify_email/success?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  return transporter.sendMail(mailOptions);
};
