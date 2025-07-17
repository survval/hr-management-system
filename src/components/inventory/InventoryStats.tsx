import React from 'react';
import { Package, Check, AlertCircle, TrendingUp, DollarSign, Users, Calendar, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui';
import { INVENTORY, EMPLOYEES } from '@/utils/mockData';

export const InventoryStats: React.FC = () => {
  // Calculate statistics
  const totalAssets = INVENTORY.length;
  const activeAssets = INVENTORY.filter(item => item.status === 'active').length;
  const maintenanceAssets = INVENTORY.filter(item => item.status === 'maintenance').length;
  const returnedAssets = INVENTORY.filter(item => item.status === 'returned').length;
  const damagedAssets = INVENTORY.filter(item => item.status === 'damaged' || item.status === 'lost').length;
  
  // Calculate percentages and changes
  const activePercentage = Math.round((activeAssets / totalAssets) * 100);
  const maintenancePercentage = Math.round((maintenanceAssets / totalAssets) * 100);
  const utilizationRate = Math.round((activeAssets / (totalAssets - returnedAssets)) * 100);
  
  // Calculate asset value (mock calculation)
  const totalValue = INVENTORY.length * 1250; // Assume average $1,250 per asset
  const activeValue = activeAssets * 1250;
  
  // Calculate assignments
  const assignedAssets = INVENTORY.filter(item => item.assignedTo && item.status === 'active').length;
  const unassignedAssets = activeAssets - assignedAssets;

  const stats = [
    {
      title: 'Total Assets',
      value: totalAssets,
      icon: Package,
      color: 'blue',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'All registered assets',
      trend: [65, 70, 68, 75, 72, 78, 80]
    },
    {
      title: 'Active Assets',
      value: activeAssets,
      percentage: activePercentage,
      icon: Check,
      color: 'green',
      change: '+5%',
      changeType: 'positive' as const,
      description: 'Currently in use',
      trend: [45, 48, 50, 52, 49, 55, 58]
    },
    {
      title: 'Maintenance',
      value: maintenanceAssets,
      percentage: maintenancePercentage,
      icon: AlertCircle,
      color: 'yellow',
      change: '-2%',
      changeType: 'negative' as const,
      description: 'Needs attention',
      trend: [8, 10, 7, 9, 6, 8, 5]
    },
    {
      title: 'Asset Value',
      value: `$${totalValue.toLocaleString()}`,
      subValue: `$${activeValue.toLocaleString()} active`,
      icon: DollarSign,
      color: 'purple',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'Total inventory value',
      trend: [120, 125, 130, 128, 135, 140, 145]
    },
    {
      title: 'Utilization Rate',
      value: `${utilizationRate}%`,
      icon: BarChart3,
      color: 'indigo',
      change: '+3%',
      changeType: 'positive' as const,
      description: 'Asset efficiency',
      trend: [75, 78, 80, 77, 82, 85, 87]
    },
    {
      title: 'Assignments',
      value: assignedAssets,
      subValue: `${unassignedAssets} unassigned`,
      icon: Users,
      color: 'teal',
      change: '+7%',
      changeType: 'positive' as const,
      description: 'Employee assignments',
      trend: [40, 42, 45, 47, 44, 48, 52]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      teal: 'bg-teal-100 text-teal-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const getChangeColor = (changeType: 'positive' | 'negative') => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getChangeBgColor = (changeType: 'positive' | 'negative') => {
    return changeType === 'positive' ? 'bg-green-50' : 'bg-red-50';
  };

  const MiniChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 bg-current opacity-60 rounded-sm`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-400">{stat.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.percentage && (
                      <span className="text-sm font-medium text-gray-500">
                        ({stat.percentage}%)
                      </span>
                    )}
                  </div>
                  
                  {stat.subValue && (
                    <p className="text-sm text-gray-500">{stat.subValue}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChangeBgColor(stat.changeType)}`}>
                      <TrendingUp className={`w-3 h-3 mr-1 ${getChangeColor(stat.changeType)}`} />
                      <span className={getChangeColor(stat.changeType)}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <div className={`${getColorClasses(stat.color)} opacity-30`}>
                      <MiniChart data={stat.trend} color={stat.color} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar for percentage stats */}
            {stat.percentage && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      stat.color === 'green' ? 'bg-green-500' : 
                      stat.color === 'yellow' ? 'bg-yellow-500' : 
                      stat.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Decorative corner element */}
            <div className={`absolute top-0 right-0 w-16 h-16 ${getColorClasses(stat.color)} opacity-10 rounded-full -mr-8 -mt-8`} />
          </Card>
        );
      })}
    </div>
  );
};