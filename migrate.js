import fs from 'fs';
import path from 'path';
import pool from './config/db.js';

async function migrateDatabase() {
    try {
        // Read the SQL file you exported from phpMyAdmin
        const sqlPath = path.resolve(process.cwd(), 'database.sql');
        const sqlQuery = fs.readFileSync(sqlPath, 'utf8');

        console.log("Running migration... this might take a second.");
        
        // Execute the SQL file on Aiven
        // Note: You must add multipleStatements: true to your db.js pool config for this to work
        await pool.query(sqlQuery);
        
        console.log("✅ Tables successfully imported to Aiven!");
        process.exit();
    } catch (error) {
        console.error("❌ Migration failed:", error);
    }
}

migrateDatabase();