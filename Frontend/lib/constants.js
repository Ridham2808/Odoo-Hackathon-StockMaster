export const ROLES = {
  INVENTORY_MANAGER: 'inventory_manager',
  WAREHOUSE_STAFF: 'warehouse_staff',
  STOCK_MASTER: 'stock_master',
};

export const ROLE_LABELS = {
  [ROLES.INVENTORY_MANAGER]: 'Inventory Manager',
  [ROLES.WAREHOUSE_STAFF]: 'Warehouse Staff',
  [ROLES.STOCK_MASTER]: 'StockMaster',
};

export const DOCUMENT_TYPES = {
  RECEIPT: 'receipt',
  DELIVERY: 'delivery',
  TRANSFER: 'transfer',
  ADJUSTMENT: 'adjustment',
  COUNT: 'count',
};

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.RECEIPT]: 'Receipt',
  [DOCUMENT_TYPES.DELIVERY]: 'Delivery',
  [DOCUMENT_TYPES.TRANSFER]: 'Transfer',
  [DOCUMENT_TYPES.ADJUSTMENT]: 'Adjustment',
  [DOCUMENT_TYPES.COUNT]: 'Count',
};

export const STATUSES = {
  DRAFT: 'draft',
  WAITING: 'waiting',
  READY: 'ready',
  DONE: 'done',
  CANCELED: 'canceled',
};

export const STATUS_LABELS = {
  [STATUSES.DRAFT]: 'Draft',
  [STATUSES.WAITING]: 'Waiting',
  [STATUSES.READY]: 'Ready',
  [STATUSES.DONE]: 'Done',
  [STATUSES.CANCELED]: 'Canceled',
};

export const STATUS_COLORS = {
  [STATUSES.DRAFT]: 'bg-neutral-100 text-neutral-700',
  [STATUSES.WAITING]: 'bg-warning/10 text-warning',
  [STATUSES.READY]: 'bg-primary/10 text-primary',
  [STATUSES.DONE]: 'bg-secondary/10 text-secondary',
  [STATUSES.CANCELED]: 'bg-danger/10 text-danger',
};

export const ROLE_PERMISSIONS = {
  [ROLES.INVENTORY_MANAGER]: [
    'view_products',
    'create_products',
    'edit_products',
    'delete_products',
    'view_receipts',
    'create_receipts',
    'approve_receipts',
    'view_deliveries',
    'create_deliveries',
    'approve_deliveries',
    'view_transfers',
    'create_transfers',
    'view_adjustments',
    'create_adjustments',
    'view_counts',
    'create_counts',
    'view_reports',
    'view_audit_log',
  ],
  [ROLES.WAREHOUSE_STAFF]: [
    'view_products',
    'view_receipts',
    'confirm_picks',
    'view_deliveries',
    'view_transfers',
    'perform_transfers',
    'view_counts',
    'update_counts',
  ],
  [ROLES.STOCK_MASTER]: [
    'view_products',
    'create_products',
    'edit_products',
    'delete_products',
    'view_receipts',
    'create_receipts',
    'approve_receipts',
    'view_deliveries',
    'create_deliveries',
    'approve_deliveries',
    'view_transfers',
    'create_transfers',
    'view_adjustments',
    'create_adjustments',
    'view_counts',
    'create_counts',
    'view_reports',
    'view_audit_log',
    'manage_locations',
    'manage_staff',
    'manage_suppliers',
    'manage_settings',
  ],
};
