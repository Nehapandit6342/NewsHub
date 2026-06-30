import { transporter } from "../config/mailer.js";

export const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `http://localhost:5000/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Account",
    html: `
      <h2>Welcome to NewsHub</h2>
      <p>Click below to verify your account:</p>
      <a href="${verifyUrl}">Verify Account</a>
    `,
  });
};
