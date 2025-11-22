import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const stockmaster = await prisma.user.upsert({
    where: { email: 'stockmaster@example.com' },
    update: {},
    create: {
      email: 'stockmaster@example.com',
      firstName: 'Stock',
      lastName: 'Master',
      passwordHash: await bcrypt.hash('StockMaster@123', 10),
      role: 'STOCKMASTER',
      isActive: true,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'yasark8850@gmail.com' },
    update: {},
    create: {
      email: 'yasark8850@gmail.com',
      firstName: 'Arif',
      lastName: 'Khan',
      passwordHash: await bcrypt.hash('TestUser@123', 10),
      role: 'INVENTORY_MANAGER',
      isActive: true,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'raju@steelworks.com' },
    update: {},
    create: {
      email: 'raju@steelworks.com',
      firstName: 'Raju',
      lastName: 'Kumar',
      passwordHash: await bcrypt.hash('Staff@123', 10),
      role: 'WAREHOUSE_STAFF',
      isActive: true,
    },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'auditor@steelworks.com' },
    update: {},
    create: {
      email: 'auditor@steelworks.com',
      firstName: 'CA',
      lastName: 'Auditor',
      passwordHash: await bcrypt.hash('Viewer@123', 10),
      role: 'VIEWER',
      isActive: true,
    },
  });

  console.log('✅ Users created:', { stockmaster, manager, staff, viewer });

  // Create categories for SteelWorks
  const steelRods = await prisma.category.upsert({
    where: { name: 'Steel Rods' },
    update: {},
    create: {
      name: 'Steel Rods',
      description: 'Various types of steel rods',
    },
  });

  const fasteners = await prisma.category.upsert({
    where: { name: 'Fasteners' },
    update: {},
    create: {
      name: 'Fasteners',
      description: 'Nuts, bolts, and screws',
    },
  });

  const bearings = await prisma.category.upsert({
    where: { name: 'Bearings' },
    update: {},
    create: {
      name: 'Bearings',
      description: 'Industrial bearings',
    },
  });

  const packingMaterial = await prisma.category.upsert({
    where: { name: 'Packing Material' },
    update: {},
    create: {
      name: 'Packing Material',
      description: 'Packaging and wrapping materials',
    },
  });

  console.log('✅ Categories created for SteelWorks');

  // Create products for SteelWorks
  const steelRod100 = await prisma.product.upsert({
    where: { sku: 'SR-100-MM' },
    update: {},
    create: {
      sku: 'SR-100-MM',
      name: 'Steel Rod 100mm',
      description: 'High-quality steel rod 100mm diameter',
      categoryId: steelRods.id,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderPoint: 100,
      unitPrice: 45.50,
      isActive: true,
    },
  });

  const steelRod50 = await prisma.product.upsert({
    where: { sku: 'SR-50-MM' },
    update: {},
    create: {
      sku: 'SR-50-MM',
      name: 'Steel Rod 50mm',
      description: 'High-quality steel rod 50mm diameter',
      categoryId: steelRods.id,
      minStockLevel: 100,
      maxStockLevel: 1000,
      reorderPoint: 200,
      unitPrice: 22.75,
      isActive: true,
    },
  });

  const nuts = await prisma.product.upsert({
    where: { sku: 'NUT-M10' },
    update: {},
    create: {
      sku: 'NUT-M10',
      name: 'Nuts M10',
      description: 'Stainless steel nuts M10',
      categoryId: fasteners.id,
      minStockLevel: 500,
      maxStockLevel: 5000,
      reorderPoint: 1000,
      unitPrice: 0.85,
      isActive: true,
    },
  });

  const bolts = await prisma.product.upsert({
    where: { sku: 'BOLT-M10' },
    update: {},
    create: {
      sku: 'BOLT-M10',
      name: 'Bolts M10',
      description: 'Stainless steel bolts M10',
      categoryId: fasteners.id,
      minStockLevel: 500,
      maxStockLevel: 5000,
      reorderPoint: 1000,
      unitPrice: 1.25,
      isActive: true,
    },
  });

  const bearingBall = await prisma.product.upsert({
    where: { sku: 'BEAR-6205' },
    update: {},
    create: {
      sku: 'BEAR-6205',
      name: 'Ball Bearing 6205',
      description: 'Deep groove ball bearing 6205',
      categoryId: bearings.id,
      minStockLevel: 20,
      maxStockLevel: 200,
      reorderPoint: 50,
      unitPrice: 8.50,
      isActive: true,
    },
  });

  const wrappingPaper = await prisma.product.upsert({
    where: { sku: 'WRAP-PAPER' },
    update: {},
    create: {
      sku: 'WRAP-PAPER',
      name: 'Wrapping Paper Roll',
      description: 'Industrial wrapping paper roll',
      categoryId: packingMaterial.id,
      minStockLevel: 100,
      maxStockLevel: 1000,
      reorderPoint: 200,
      unitPrice: 3.50,
      isActive: true,
    },
  });

  console.log('✅ Products created for SteelWorks');

  // Create locations for SteelWorks
  const mainStore = await prisma.location.upsert({
    where: { code: 'MAIN-STORE' },
    update: {},
    create: {
      code: 'MAIN-STORE',
      name: 'Main Store',
      type: 'WAREHOUSE',
      address: 'SteelWorks Pvt Ltd, Industrial Area',
      capacity: 50000,
      isActive: true,
    },
  });

  const productionRack = await prisma.location.upsert({
    where: { code: 'PROD-RACK' },
    update: {},
    create: {
      code: 'PROD-RACK',
      name: 'Production Rack',
      type: 'WAREHOUSE',
      address: 'Production Floor, Building A',
      capacity: 20000,
      isActive: true,
    },
  });

  const packingArea = await prisma.location.upsert({
    where: { code: 'PACK-AREA' },
    update: {},
    create: {
      code: 'PACK-AREA',
      name: 'Packing Area',
      type: 'WAREHOUSE',
      address: 'Packing Department, Building B',
      capacity: 10000,
      isActive: true,
    },
  });

  console.log('✅ Locations created for SteelWorks');

  // Create product locations (stock) for SteelWorks
  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: steelRod100.id,
        locationId: mainStore.id,
      },
    },
    update: {},
    create: {
      productId: steelRod100.id,
      locationId: mainStore.id,
      quantity: 150,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: steelRod50.id,
        locationId: mainStore.id,
      },
    },
    update: {},
    create: {
      productId: steelRod50.id,
      locationId: mainStore.id,
      quantity: 300,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: steelRod50.id,
        locationId: productionRack.id,
      },
    },
    update: {},
    create: {
      productId: steelRod50.id,
      locationId: productionRack.id,
      quantity: 100,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: nuts.id,
        locationId: mainStore.id,
      },
    },
    update: {},
    create: {
      productId: nuts.id,
      locationId: mainStore.id,
      quantity: 2000,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: bolts.id,
        locationId: mainStore.id,
      },
    },
    update: {},
    create: {
      productId: bolts.id,
      locationId: mainStore.id,
      quantity: 1500,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: bearingBall.id,
        locationId: productionRack.id,
      },
    },
    update: {},
    create: {
      productId: bearingBall.id,
      locationId: productionRack.id,
      quantity: 75,
    },
  });

  await prisma.productLocation.upsert({
    where: {
      productId_locationId: {
        productId: wrappingPaper.id,
        locationId: packingArea.id,
      },
    },
    update: {},
    create: {
      productId: wrappingPaper.id,
      locationId: packingArea.id,
      quantity: 500,
    },
  });

  console.log('✅ Product locations created for SteelWorks');

  // Create suppliers for SteelWorks
  // First delete existing suppliers to avoid duplicates
  await prisma.supplier.deleteMany({});
  
  const tataSteel = await prisma.supplier.create({
    data: {
      name: 'Tata Steel',
      email: 'sales@tatasteel.com',
      phone: '+91-22-6665-8282',
      address: 'Tata Steel Limited, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400001',
      isActive: true,
    },
  });

  const jindal = await prisma.supplier.create({
    data: {
      name: 'Jindal Steel',
      email: 'contact@jindalsteel.com',
      phone: '+91-11-4141-4141',
      address: 'Jindal Steel & Power Ltd, Delhi',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      zipCode: '110001',
      isActive: true,
    },
  });

  const fastenerCorp = await prisma.supplier.create({
    data: {
      name: 'Fastener Corporation',
      email: 'supply@fastenercorp.com',
      phone: '+91-80-4141-4141',
      address: 'Fastener Corp, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560001',
      isActive: true,
    },
  });

  console.log('✅ Suppliers created for SteelWorks:', { tataSteel, jindal, fastenerCorp });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
