import React from 'react';
import { Card } from '@/components/ui';

interface TodayActivityProps {
  isClocked: boolean;
}

export const TodayActivity: React.FC<TodayActivityProps> = ({ isClocked }) => {
  const activities = [
    { label: 'Clock In', time: '09:15 AM', status: 'completed' },
    { label: 'Break Start', time: '12:30 PM', status: 'completed' },
    { label: 'Break End', time: '01:30 PM', status: 'completed' },
    { label: 'Clock Out', time: isClocked ? 'Clocked In' : 'Pending', status: isClocked ? 'active' : 'pending' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'active':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{activity.label}</span>
            <span className={`text-sm font-medium ${getStatusColor(activity.status)}`}>
              {activity.time}
            </span>
          </div>
        ))}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">Total Hours</span>
            <span className="text-lg font-bold text-blue-600">7h 30m</span>
          </div>
        </div>
      </div>
    </Card>
  );
};