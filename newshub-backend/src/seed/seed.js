import dotenv from "dotenv";
import pool from "../config/db.js";
import { seedAdmin } from "./adminSeeder.js";

dotenv.config();

const runSeed = async () => {
  try {
    console.log("🌱 Starting Seeder...");

    await seedAdmin();

    console.log("✅ All Seeders Completed");
    process.exit(0); // stop script after running
  } catch (err) {
    console.error("❌ Seeder Error:", err.message);
    process.exit(1);
  }
};

runSeed();
