import React from 'react';
import { Clock, FileText, User, Package } from 'lucide-react';
import { Card } from '@/components/ui';

interface QuickActionsProps {
  onNavigate?: (tab: string) => void;
  onShowLeaveModal?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate, onShowLeaveModal }) => {
  const actions = [
    {
      icon: Clock,
      label: 'Clock In/Out',
      color: 'text-blue-600',
      onClick: () => onNavigate?.('time-tracking')
    },
    {
      icon: FileText,
      label: 'Request Leave',
      color: 'text-green-600',
      onClick: onShowLeaveModal
    },
    {
      icon: User,
      label: 'My Profile',
      color: 'text-purple-600',
      onClick: () => onNavigate?.('profile')
    },
    {
      icon: Package,
      label: 'My Assets',
      color: 'text-orange-600',
      onClick: () => onNavigate?.('inventory')
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icon className={`w-8 h-8 ${action.color} mb-2`} />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};