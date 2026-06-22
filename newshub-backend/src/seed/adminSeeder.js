import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const seedAdmin = async () => {
  try {
    const admins = [
      {
        name: "Admin One",
        email: "admin@test.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Admin Two",
        email: "santosshpandit378@gmail.com",
        password: "neha2060",
        role: "admin",
      },
    ];

    for (const admin of admins) {
      const existing = await pool.query(
        "SELECT * FROM admins WHERE email = $1",
        [admin.email],
      );

      if (existing.rows.length > 0) {
        console.log(`${admin.email} already exists`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(admin.password, 10);

      await pool.query(
        `INSERT INTO admins (name, email, password, role)
         VALUES ($1, $2, $3, $4)`,
        [admin.name, admin.email, hashedPassword, admin.role],
      );

      console.log(`${admin.email} created successfully`);
    }
  } catch (err) {
    console.error("Seeder Error:", err.message);
  }
};
