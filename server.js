import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; 
import rateLimit from 'express-rate-limit'; 
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();

// ==========================================
// 🛡️ SECURITY & MIDDLEWARE
// ==========================================

// 1. Helmet: Protects against well-known web vulnerabilities
app.use(helmet());

// 2. Strict CORS: Only allow your frontend to talk to this backend
const corsOptions = {
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));

// 3. Rate Limiter: Protects against DDoS and contact form spam
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 mins
    message: { status: "error", message: "Too many requests from this IP, please try again later." },
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use('/api', apiLimiter); 

// 4. Body Parser with Payload Limit
app.use(express.json({ limit: '10kb' })); 


// ==========================================
// 🚀 ROUTES
// ==========================================

// [NEW] 1. Health Check Route (Crucial for hosting platforms)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Portfolio API is running smoothly.' });
});

// 2. API Routes
app.use('/api', portfolioRoutes);

// 3. Catch-all 404 Handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: `Route ${req.originalUrl} not found on this server.` });
});


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
    console.error("🔥 Critical Server Error:", err.stack);
    
    // Don't leak exact error details to the frontend in production
    const message = process.env.NODE_ENV === 'production' 
        ? "Internal Server Error!" 
        : err.message;

    res.status(err.statusCode || 500).json({ status: "error", message: message });
});


// ==========================================
//  START SERVER & CRASH PROTECTION
// ==========================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running safely on port ${PORT}`);
});

// [NEW] Protect against unexpected synchronous bugs
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down gracefully...');
    console.error(err.name, err.message);
    process.exit(1);
});

// [NEW] Protect against failing Promises (like a failed DB connection)
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down gracefully...');
    console.error(err.name, err.message);
    
    // Close the server safely to finish active requests before killing the app
    server.close(() => {
        process.exit(1); 
    });
});

// [NEW] Graceful Shutdown (Used by hosting platforms when you deploy new code)
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully.');
    server.close(() => {
        console.log('Process terminated.');
    });
});