
import express from "express";
import { pool } from "./config/database.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("EverydayOS Backend is running!");
});

app.get("/health", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "select now() as time, current_database() as db"
    );

    res.json({
      status: "ok",
      db: rows[0]
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

// Database test
app.get("/db-test", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "select $1::int + $2::int as sum",
      [2, 40]
    );

    res.json({
      ok: true,
      sum: rows[0].sum
    });
  } catch (error) {
    console.error("Database test failed:", error);
    res.status(500).json({
      ok: false,
      message: "Database query failed"
    });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
