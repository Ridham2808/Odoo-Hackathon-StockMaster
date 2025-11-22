import prisma from './src/prisma/prisma.js';

async function seedProducts() {
  try {
    console.log('Starting product seeding...');

    // Create categories first
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: { name: 'Electronics', description: 'Electronic devices and components' },
      }),
      prisma.category.upsert({
        where: { name: 'Hardware' },
        update: {},
        create: { name: 'Hardware', description: 'Hardware items and tools' },
      }),
      prisma.category.upsert({
        where: { name: 'Software' },
        update: {},
        create: { name: 'Software', description: 'Software licenses and packages' },
      }),
    ]);

    console.log('Categories created:', categories.length);

    // Create sample products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { sku: 'PROD-001' },
        update: {},
        create: {
          sku: 'PROD-001',
          name: 'Laptop Computer',
          description: 'High-performance laptop',
          categoryId: categories[0].id,
          minStockLevel: 5,
          maxStockLevel: 50,
          reorderPoint: 10,
          unitPrice: 999.99,
          isActive: true,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'PROD-002' },
        update: {},
        create: {
          sku: 'PROD-002',
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse',
          categoryId: categories[0].id,
          minStockLevel: 20,
          maxStockLevel: 200,
          reorderPoint: 50,
          unitPrice: 29.99,
          isActive: true,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'PROD-003' },
        update: {},
        create: {
          sku: 'PROD-003',
          name: 'USB Cable',
          description: 'High-speed USB 3.0 cable',
          categoryId: categories[0].id,
          minStockLevel: 50,
          maxStockLevel: 500,
          reorderPoint: 100,
          unitPrice: 9.99,
          isActive: true,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'PROD-004' },
        update: {},
        create: {
          sku: 'PROD-004',
          name: 'Screwdriver Set',
          description: 'Professional screwdriver set',
          categoryId: categories[1].id,
          minStockLevel: 10,
          maxStockLevel: 100,
          reorderPoint: 20,
          unitPrice: 49.99,
          isActive: true,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'PROD-005' },
        update: {},
        create: {
          sku: 'PROD-005',
          name: 'Office Suite License',
          description: 'Annual office software license',
          categoryId: categories[2].id,
          minStockLevel: 5,
          maxStockLevel: 50,
          reorderPoint: 10,
          unitPrice: 199.99,
          isActive: true,
        },
      }),
    ]);

    console.log('Products created:', products.length);

    // Create a default location
    const location = await prisma.location.upsert({
      where: { name: 'Main Warehouse' },
      update: {},
      create: {
        name: 'Main Warehouse',
        address: '123 Warehouse St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        isActive: true,
      },
    });

    console.log('Location created:', location.name);

    // Add stock to products at location
    for (const product of products) {
      await prisma.productLocation.upsert({
        where: {
          productId_locationId: {
            productId: product.id,
            locationId: location.id,
          },
        },
        update: { quantity: 100 },
        create: {
          productId: product.id,
          locationId: location.id,
          quantity: 100,
        },
      });
    }

    console.log('Stock added to all products');
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
