import express from 'express';
import auditService from './audit.service.js';
import { authMiddleware, rolesMiddleware } from '../../common/middleware/auth.js';
import { logger } from '../../common/logger/logger.js';

const router = express.Router();

router.get('/', authMiddleware, rolesMiddleware('STOCKMASTER'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      entity: req.query.entity,
      action: req.query.action,
      userId: req.query.userId,
    };

    const result = await auditService.getAll(page, limit, filters);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get audit logs error', error);
    res.status(400).json({
      ok: false,
      error: { code: 400, message: error.message },
    });
  }
});

router.get('/:id', authMiddleware, rolesMiddleware('STOCKMASTER'), async (req, res) => {
  try {
    const result = await auditService.getById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get audit log error', error);
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({
      ok: false,
      error: { code: status, message: error.message },
    });
  }
});

router.get('/entity/:entity/:entityId', authMiddleware, rolesMiddleware('STOCKMASTER'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await auditService.getByEntity(req.params.entity, req.params.entityId, page, limit);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get audit logs by entity error', error);
    res.status(400).json({
      ok: false,
      error: { code: 400, message: error.message },
    });
  }
});

export default router;
