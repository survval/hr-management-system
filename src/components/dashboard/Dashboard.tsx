import React from 'react';
import { StatsCards } from './StatsCards';
import { RecentActivity } from './RecentActivity';
import { UpcomingEvents } from './UpcomingEvents';
import { QuickActions } from './QuickActions';
import { CURRENT_USER } from '@/utils/mockData';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
  onShowLeaveModal?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onShowLeaveModal }) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {CURRENT_USER.name}</h1>
          <p className="text-gray-600">Here's what's happening at your company today</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingEvents />
      </div>

      {/* Quick Actions */}
      <QuickActions 
        onNavigate={onNavigate}
        onShowLeaveModal={onShowLeaveModal}
      />
    </div>
  );
};