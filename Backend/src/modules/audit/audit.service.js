import prisma from '../../prisma/prisma.js';
import { logger } from '../../common/logger/logger.js';

export class AuditService {
  async getAll(page = 1, limit = 20, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      const where = {};

      if (filters.entity) where.entity = filters.entity;
      if (filters.action) where.action = filters.action;
      if (filters.userId) where.userId = filters.userId;

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          skip,
          take: limit,
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.auditLog.count({ where }),
      ]);

      return {
        ok: true,
        data: logs,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Get audit logs error', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const log = await prisma.auditLog.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!log) {
        throw new Error('Audit log not found');
      }

      return {
        ok: true,
        data: log,
      };
    } catch (error) {
      logger.error('Get audit log by ID error', error);
      throw error;
    }
  }

  async getByEntity(entity, entityId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where: { entity, entityId },
          skip,
          take: limit,
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.auditLog.count({ where: { entity, entityId } }),
      ]);

      return {
        ok: true,
        data: logs,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Get audit logs by entity error', error);
      throw error;
    }
  }
}

export default new AuditService();
