import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendEmail.js";

import { registerAdmin, loginAdmin } from "../services/auth.service.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  // 1. save user in DB (IMPORTANT)
  // isVerified = false initially

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  await sendVerificationEmail(email, token);

  res.json({
    message: "Registration successful. Check your email to verify account.",
  });
};
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const email = decoded.email;

    // update user in DB
    // User.update({ isVerified: true }, { where: { email } });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginAdmin(req.body.email, req.body.password);

    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
