import { registerAdmin, loginAdmin } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const admin = await registerAdmin(
      req.body.name,
      req.body.email,
      req.body.password,
    );

    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
