import prisma from '../../prisma/prisma.js';
import { logger } from '../../common/logger/logger.js';

export class SearchService {
  async searchProducts(query, filters = {}) {
    try {
      const where = {};

      if (query) {
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ];
      }

      if (filters.categoryId) where.categoryId = filters.categoryId;
      if (filters.supplierId) {
        where.suppliers = {
          some: { id: filters.supplierId },
        };
      }
      if (filters.locationId) {
        where.locations = {
          some: { locationId: filters.locationId },
        };
      }

      const products = await prisma.product.findMany({
        where,
        include: {
          category: true,
          locations: { include: { location: true } },
        },
        take: 50,
      });

      return {
        ok: true,
        data: products,
      };
    } catch (error) {
      logger.error('Search products error', error);
      throw error;
    }
  }

  async searchSuppliers(query, filters = {}) {
    try {
      const where = {};

      if (query) {
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
        ];
      }

      const suppliers = await prisma.supplier.findMany({
        where,
        include: { movements: true },
        take: 50,
      });

      return {
        ok: true,
        data: suppliers,
      };
    } catch (error) {
      logger.error('Search suppliers error', error);
      throw error;
    }
  }
}

export default new SearchService();
