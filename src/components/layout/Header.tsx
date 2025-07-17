'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Bell, Moon, Sun } from 'lucide-react';
import { CURRENT_USER, NAVIGATION_ITEMS } from '@/utils/mockData';
import { Navigation } from './Navigation';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div className="text-xl font-bold text-blue-600">HRSystem</div>
            </div>
            <div className="hidden md:block text-sm text-gray-500">
              {currentTime}
            </div>
          </div>
          
          {/* Navigation */}
          <Navigation 
            items={NAVIGATION_ITEMS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { id: 1, message: 'New leave request from John Doe', time: '2 hours ago' },
                      { id: 2, message: 'Equipment return reminder', time: '4 hours ago' },
                      { id: 3, message: 'Monthly report is ready', time: '1 day ago' }
                    ].map((notification) => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <img
                src={CURRENT_USER.photo}
                alt={CURRENT_USER.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{CURRENT_USER.name}</div>
                <div className="text-xs text-gray-500">{CURRENT_USER.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};