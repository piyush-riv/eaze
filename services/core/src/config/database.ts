import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { Pool } from "pg";

// Resolve services/core/.env regardless of the directory the process was
// started from (repo root vs. services/core). Works from both src/ (tsx)
// and dist/ (compiled), since both sit two levels below the package root.
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

dotenv.config({ path: resolve(packageRoot, ".env") });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is missing from .env");
}

export const pool = new Pool({
    connectionString,
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});

export async function connectDatabase() {
    const client = await pool.connect();

    try {
        await client.query("SELECT 1");
        console.log("PostgreSQL connected successfully");
    } finally {
        client.release();
    }
}