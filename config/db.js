import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000, // Updated fallback to TiDB's port
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        // --- AIVEN SSL CONFIG (Commented out for later use) ---
        // ca: fs.readFileSync(path.resolve(process.cwd(), 'ca.pem')),
        
        // --- TIDB CLOUD SSL CONFIG ---
        rejectUnauthorized: true 
    },
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    multipleStatements: true
});

pool.getConnection()
    .then((connection) => {
        console.log('✅ Database connected successfully!');
        connection.release(); 
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error.message);
    });

export default pool;