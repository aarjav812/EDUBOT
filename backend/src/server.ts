import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './utils/db';
import reminderScheduler from './utils/scheduler';

// Load env vars
dotenv.config();

// Route imports
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import reminderRoutes from './routes/reminderRoutes';

// Initialize express
const app: Application = express();

// Connect to database
connectDB();

// Start reminder scheduler
reminderScheduler.start();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(compression()); // Compression
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'EduBot API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reminders', reminderRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║                                        ║
  ║     🤖 EduBot API Server Running      ║
  ║                                        ║
  ║     Port: ${PORT}                        ║
  ║     Environment: ${process.env.NODE_ENV}          ║
  ║     AI Provider: ${process.env.AI_PROVIDER}            ║
  ║                                        ║
  ╚════════════════════════════════════════╝
  `);
});

export default app;
