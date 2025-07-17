import React, { useState } from 'react';
import { Plus, Filter, Download, RefreshCw, Settings } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { InventoryStats } from './InventoryStats';
import { InventoryTable } from './InventoryTable';
import { AddAssetModal } from './AddAssetModal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';

export const Inventory: React.FC = () => {
  const { isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal } = useModal();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Inventory data refreshed successfully!', 'success');
    }, 1500);
  };

  const handleBulkImport = () => {
    showToast('Bulk import feature coming soon!', 'info');
    // In a real app, this would open a file upload modal
  };

  const handleSettings = () => {
    showToast('Inventory settings panel would open here', 'info');
    // In a real app, this would open inventory configuration
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage company assets, equipment, and resources
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="secondary"
            onClick={handleRefresh}
            icon={RefreshCw}
            disabled={isRefreshing}
            className={isRefreshing ? 'animate-spin' : ''}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleBulkImport}
            icon={Download}
          >
            Bulk Import
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleSettings}
            icon={Settings}
          >
            Settings
          </Button>
          
          <Button 
            onClick={openAddModal}
            icon={Plus}
          >
            Add Asset
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <InventoryStats />

      {/* Quick Actions Card */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Asset Overview</h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage all your company assets in one place
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Returned</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Issues</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Table */}
      <InventoryTable />
      
      {/* Add Asset Modal */}
      <AddAssetModal 
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
      />
    </div>
  );
};