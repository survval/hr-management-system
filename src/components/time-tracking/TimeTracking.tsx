import React, { useState, useEffect } from 'react';
import { ClockInMethods } from './ClockInMethods';
import { TodayActivity } from './TodayActivity';
import { WeeklySummary } from './WeeklySummary';

export const TimeTracking: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [clockInMethod, setClockInMethod] = useState('manual');
  const [isClocked, setIsClocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Current time: {currentTime}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClockInMethods 
          clockInMethod={clockInMethod}
          setClockInMethod={setClockInMethod}
          isClocked={isClocked}
          setIsClocked={setIsClocked}
          currentTime={currentTime}
        />
        <TodayActivity isClocked={isClocked} />
      </div>

      <WeeklySummary />
    </div>
  );
};