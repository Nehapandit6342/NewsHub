import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAdminByEmail, createAdmin } from "../models/auth.model.js";

export const registerAdmin = async (name, email, password) => {
  const existing = await findAdminByEmail(email);
  if (existing) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createAdmin(name, email, hashedPassword);
};

export const loginAdmin = async (email, password) => {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // remove password before returning
  const { password: _, ...safeAdmin } = admin;

  return { token, admin: safeAdmin };
};
