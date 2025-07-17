'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Dashboard } from '@/components/dashboard';
import { TimeTracking } from '@/components/time-tracking';
import { Profile } from '@/components/profile';
import { Inventory } from '@/components/inventory';
import { LeaveManagement } from '@/components/leave';
import { MobileNav } from '@/components/layout';
import { ToastProvider } from '@/hooks/useToast';

export default function HRManagementSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'profile':
        return <Profile />;
      case 'inventory':
        return <Inventory />;
      case 'leave':
        return <LeaveManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
          {renderContent()}
        </main>

        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ToastProvider>
  );
}