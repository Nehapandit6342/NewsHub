import pool from "../config/db.js";

export const findAdminByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const createAdmin = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO admins (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, hashedPassword],
  );

  return result.rows[0];
};
