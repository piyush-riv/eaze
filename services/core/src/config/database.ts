import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: "./.env" });

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