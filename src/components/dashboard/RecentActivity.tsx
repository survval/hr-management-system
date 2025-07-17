import React from 'react';
import { Card } from '@/components/ui';
import { RECENT_ACTIVITIES } from '@/utils/mockData';

export const RecentActivity: React.FC = () => {
  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      'clock-in': 'bg-green-500',
      'leave': 'bg-yellow-500',
      'inventory': 'bg-purple-500',
      'profile': 'bg-blue-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {RECENT_ACTIVITIES.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}></div>
            <span className="text-sm text-gray-600">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </span>
            <span className="text-xs text-gray-400 ml-auto">{activity.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};