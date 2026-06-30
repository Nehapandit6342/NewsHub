import pool from "../config/db.js";

export const subscribeUserService = async (email) => {
  // Check if email already exists
  const existing = await pool.query(
    "SELECT * FROM subscribers WHERE email = $1",
    [email],
  );

  if (existing.rows.length > 0) {
    throw new Error("Email already subscribed");
  }

  // Insert new subscriber
  const result = await pool.query(
    `INSERT INTO subscribers (email)
     VALUES ($1)
     RETURNING *`,
    [email],
  );

  return result.rows[0];
};
