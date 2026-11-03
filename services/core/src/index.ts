
import { prisma } from "./lib/prisma.js";

console.log("EverydayOS Core starting...");

// Temporary database connection test
async function main() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
