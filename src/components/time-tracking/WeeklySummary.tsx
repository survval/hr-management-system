import React from 'react';
import { Card } from '@/components/ui';

export const WeeklySummary: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{day}</div>
            <div className={`h-20 rounded-md flex items-center justify-center text-sm font-medium ${
              index < 5 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {index < 5 ? '8h' : '0h'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};