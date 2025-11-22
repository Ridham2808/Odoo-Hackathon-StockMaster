import prisma from '../../prisma/prisma.js';
import { logger } from '../../common/logger/logger.js';

export class ProductsService {
  async getAll(page = 1, limit = 20, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      
      // Build where clause
      const where = {};
      
      // Only show non-deleted products
      where.deletedAt = null;
      
      // Apply additional filters
      if (filters.categoryId) {
        where.categoryId = filters.categoryId;
      }
      
      if (filters.isActive !== undefined) {
        where.isActive = filters.isActive === true || filters.isActive === 'true';
      }
      
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { sku: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      // Debug: Check total products in DB (including deleted)
      const totalInDb = await prisma.product.count({});
      const totalNonDeleted = await prisma.product.count({ 
        where: { deletedAt: null } 
      });
      const totalWithWhere = await prisma.product.count({ where });
      
      logger.info(`[PRODUCTS DEBUG] Total in DB: ${totalInDb}, Non-deleted: ${totalNonDeleted}, With filters: ${totalWithWhere}`);
      logger.info(`[PRODUCTS DEBUG] Where clause:`, JSON.stringify(where, null, 2));

      const products = await prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { 
          locations: {
            include: {
              location: true
            }
          }, 
          category: true 
        },
        orderBy: { createdAt: 'desc' },
      });

      const total = await prisma.product.count({ where });

      logger.info(`[PRODUCTS DEBUG] Query returned ${products.length} products. Total matching: ${total}`);
      if (products.length > 0) {
        logger.info(`[PRODUCTS DEBUG] First product: ${products[0].sku} - ${products[0].name}`);
        logger.info(`[PRODUCTS DEBUG] First product deletedAt: ${products[0].deletedAt}`);
      } else {
        logger.warn(`[PRODUCTS DEBUG] No products returned! Total in DB: ${totalInDb}, With filters: ${totalWithWhere}`);
        // Try a completely unfiltered query to see if we can get ANY products
        const allProducts = await prisma.product.findMany({ take: 5 });
        logger.info(`[PRODUCTS DEBUG] Unfiltered query returned ${allProducts.length} products`);
      }

      return {
        ok: true,
        data: products,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('[PRODUCTS ERROR] Get all products error:', error);
      logger.error('[PRODUCTS ERROR] Error stack:', error.stack);
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          locations: { include: { location: true } },
          category: true,
          batches: true,
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      return {
        ok: true,
        data: product,
      };
    } catch (error) {
      logger.error('Get product by ID error', error);
      throw error;
    }
  }

  async create(data, userId, ipAddress) {
    try {
      const existingSku = await prisma.product.findUnique({
        where: { sku: data.sku },
      });

      if (existingSku) {
        throw new Error('SKU already exists');
      }

      const product = await prisma.product.create({
        data: {
          sku: data.sku,
          name: data.name,
          description: data.description,
          categoryId: data.categoryId || null,
          minStockLevel: data.minStockLevel || 10,
          maxStockLevel: data.maxStockLevel || 1000,
          reorderPoint: data.reorderPoint || 50,
          unitPrice: data.unitPrice || 0,
          isActive: data.isActive !== undefined ? data.isActive : true, // Default to active
        },
        include: { category: true },
      });

      await this.logAudit(userId, 'Product', product.id, 'CREATE', null, product, ipAddress);

      logger.info(`Product created: ${product.sku}`);

      return {
        ok: true,
        data: product,
      };
    } catch (error) {
      logger.error('Create product error', error);
      throw error;
    }
  }

  async update(id, data, userId, ipAddress) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new Error('Product not found');
      }

      if (data.sku && data.sku !== product.sku) {
        const existingSku = await prisma.product.findUnique({
          where: { sku: data.sku },
        });

        if (existingSku) {
          throw new Error('SKU already exists');
        }
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
        include: { category: true },
      });

      await this.logAudit(userId, 'Product', id, 'UPDATE', product, updatedProduct, ipAddress);

      logger.info(`Product updated: ${updatedProduct.sku}`);

      return {
        ok: true,
        data: updatedProduct,
      };
    } catch (error) {
      logger.error('Update product error', error);
      throw error;
    }
  }

  async delete(id, userId, ipAddress) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new Error('Product not found');
      }

      await prisma.product.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      await this.logAudit(userId, 'Product', id, 'DELETE', product, null, ipAddress);

      logger.info(`Product deleted: ${product.sku}`);

      return {
        ok: true,
        data: { message: 'Product deleted successfully' },
      };
    } catch (error) {
      logger.error('Delete product error', error);
      throw error;
    }
  }

  async bulkCreate(products, userId, ipAddress) {
    try {
      const created = [];

      for (const productData of products) {
        const existingSku = await prisma.product.findUnique({
          where: { sku: productData.sku },
        });

        if (!existingSku) {
          const product = await prisma.product.create({
            data: {
              sku: productData.sku,
              name: productData.name,
              description: productData.description,
              categoryId: productData.categoryId,
              minStockLevel: productData.minStockLevel || 10,
              maxStockLevel: productData.maxStockLevel || 1000,
              reorderPoint: productData.reorderPoint || 50,
              unitPrice: productData.unitPrice || 0,
            },
          });

          created.push(product);
          await this.logAudit(userId, 'Product', product.id, 'CREATE', null, product, ipAddress);
        }
      }

      logger.info(`Bulk created ${created.length} products`);

      return {
        ok: true,
        data: {
          created: created.length,
          products: created,
        },
      };
    } catch (error) {
      logger.error('Bulk create products error', error);
      throw error;
    }
  }

  async logAudit(userId, entity, entityId, action, before, after, ipAddress) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          entity,
          entityId,
          action,
          before,
          after,
          ipAddress,
        },
      });
    } catch (error) {
      logger.error('Audit log error', error);
    }
  }

  async getCategories() {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });

      return {
        ok: true,
        data: categories,
      };
    } catch (error) {
      logger.error('Get categories error', error);
      throw error;
    }
  }
}

export default new ProductsService();
