import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 24316, // Aiven uses a custom port!
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        // This reads the ca.pem file from your backend root directory
        ca: fs.readFileSync(path.resolve(process.cwd(), 'ca.pem')),
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