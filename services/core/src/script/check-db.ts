import { connectDatabase, pool } from "../config/database.js";

async function checkDatabase() {
    try {
        await connectDatabase();

        console.log("Database check completed successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

checkDatabase();