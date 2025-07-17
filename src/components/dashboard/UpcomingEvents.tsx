import React from 'react';
import { Card } from '@/components/ui';
import { UPCOMING_EVENTS } from '@/utils/mockData';
import { getEventEmoji } from '@/utils/helpers';

export const UpcomingEvents: React.FC = () => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {UPCOMING_EVENTS.map((event, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {getEventEmoji(event.type)}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{event.name}</p>
              <p className="text-xs text-gray-500">{event.department}</p>
            </div>
            <span className="text-xs text-blue-600 font-medium">{event.date}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};