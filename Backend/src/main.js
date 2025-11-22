import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { logger } from './common/logger/logger.js';
import { errorHandler } from './common/middleware/error-handler.js';
import authRoutes from './modules/auth/auth.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import productRoutes from './modules/products/products.routes.js';
import movementRoutes from './modules/movements/movements.routes.js';
import countRoutes from './modules/counts/counts.routes.js';
import locationRoutes from './modules/locations/locations.routes.js';
import supplierRoutes from './modules/suppliers/suppliers.routes.js';
import staffRoutes from './modules/staff/staff.routes.js';
import reportRoutes from './modules/reports/reports.routes.js';
import searchRoutes from './modules/search/search.routes.js';
import notificationRoutes from './modules/notifications/notifications.routes.js';
import auditRoutes from './modules/audit/audit.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  }),
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ ok: true, data: { status: 'healthy' } });
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/products', productRoutes);
app.use('/movements', movementRoutes);
app.use('/counts', countRoutes);
app.use('/locations', locationRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/staff', staffRoutes);
app.use('/reports', reportRoutes);
app.use('/search', searchRoutes);
app.use('/notifications', notificationRoutes);
app.use('/audit-log', auditRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: {
      code: 404,
      message: 'Route not found',
    },
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
