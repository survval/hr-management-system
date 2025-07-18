// Re-export inventory components
export { Inventory } from './Inventory';
export { InventoryStats } from './InventoryStats';
export { InventoryTable } from './InventoryTable';
export { AddAssetModal } from './AddAssetModal';

// Export types
export type { AddAssetModalProps } from './AddAssetModal';

// Named imports for default object export
import { Inventory } from './Inventory';
import { InventoryStats } from './InventoryStats';
import { InventoryTable } from './InventoryTable';
import { AddAssetModal } from './AddAssetModal';

// Assign to variable before default export to satisfy ESLint and TypeScript
const InventoryComponents = {
  Inventory,
  InventoryStats,
  InventoryTable,
  AddAssetModal
};

export default InventoryComponents;
