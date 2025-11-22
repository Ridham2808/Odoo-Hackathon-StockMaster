import express from 'express';
import suppliersService from './suppliers.service.js';
import { authMiddleware, rolesMiddleware } from '../../common/middleware/auth.js';
import { validateRequest, createSupplierSchema } from '../../common/utils/validators.js';
import { logger } from '../../common/logger/logger.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      isActive: req.query.isActive === 'true',
      search: req.query.search,
    };

    const result = await suppliersService.getAll(page, limit, filters);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get suppliers error', error);
    res.status(400).json({
      ok: false,
      error: { code: 400, message: error.message },
    });
  }
});

router.post('/', authMiddleware, rolesMiddleware('INVENTORY_MANAGER', 'STOCKMASTER'), validateRequest(createSupplierSchema), async (req, res) => {
  try {
    const result = await suppliersService.create(req.validatedBody, req.user.sub, req.ip);
    res.status(201).json(result);
  } catch (error) {
    logger.error('Create supplier error', error);
    res.status(400).json({
      ok: false,
      error: { code: 400, message: error.message },
    });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await suppliersService.getById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Get supplier error', error);
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({
      ok: false,
      error: { code: status, message: error.message },
    });
  }
});

router.put('/:id', authMiddleware, rolesMiddleware('INVENTORY_MANAGER', 'STOCKMASTER'), async (req, res) => {
  try {
    const result = await suppliersService.update(req.params.id, req.body, req.user.sub, req.ip);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Update supplier error', error);
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({
      ok: false,
      error: { code: status, message: error.message },
    });
  }
});

router.delete('/:id', authMiddleware, rolesMiddleware('INVENTORY_MANAGER', 'STOCKMASTER'), async (req, res) => {
  try {
    const result = await suppliersService.delete(req.params.id, req.user.sub, req.ip);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Delete supplier error', error);
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({
      ok: false,
      error: { code: status, message: error.message },
    });
  }
});

export default router;
