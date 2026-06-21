import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const getAllEditorsService = async () => {
  const result = await pool.query(
    "SELECT id, name, email, role FROM admins WHERE role = 'editor'",
  );

  return result.rows;
};
export const createEditorService = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO admins (name, email, password, role)
     VALUES ($1, $2, $3, 'editor')
     RETURNING id, name, email, role`,
    [name, email, hashedPassword],
  );

  return result.rows[0];
};
export const deleteEditorService = async (id) => {
  await pool.query("DELETE FROM admins WHERE id = $1 AND role = 'editor'", [
    id,
  ]);

  return true;
};
