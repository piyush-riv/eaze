
import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("EverydayOS Backend is running!");
});

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
