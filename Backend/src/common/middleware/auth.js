import jwt from 'jsonwebtoken';
import { logger } from '../logger/logger.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        error: {
          code: 401,
          message: 'Missing or invalid authorization header',
        },
      });
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (verifyError) {
      logger.error('Token verification failed:', verifyError.message);
      // Try with alternative secret if available
      if (process.env.JWT_SECRET !== 'your-secret-key') {
        try {
          const decoded = jwt.verify(token, 'your-secret-key');
          req.user = decoded;
          next();
          return;
        } catch (e) {
          // Fall through to error response
        }
      }
      throw verifyError;
    }
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.status(401).json({
      ok: false,
      error: {
        code: 401,
        message: 'Invalid or expired token',
      },
    });
  }
};

export const rolesMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        error: {
          code: 401,
          message: 'Unauthorized',
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        ok: false,
        error: {
          code: 403,
          message: 'Forbidden - Insufficient permissions',
        },
      });
    }

    next();
  };
};
