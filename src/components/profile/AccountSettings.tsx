import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { useToast } from '@/hooks/useToast';

interface SettingsState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

export const AccountSettings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const { showToast } = useToast();

  const handleToggle = (setting: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    showToast('Settings updated successfully!');
  };

  const handleSelectChange = (setting: keyof SettingsState, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    showToast('Settings updated successfully!');
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void; disabled?: boolean }> = ({ 
    enabled, 
    onToggle, 
    disabled = false 
  }) => (
    <button 
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
      
      <div className="space-y-6">
        {/* Notification Settings */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Email Notifications</h5>
                <p className="text-sm text-gray-500">Receive email notifications about your account</p>
              </div>
              <ToggleSwitch 
                enabled={settings.emailNotifications}
                onToggle={() => handleToggle('emailNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Push Notifications</h5>
                <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
              </div>
              <ToggleSwitch 
                enabled={settings.pushNotifications}
                onToggle={() => handleToggle('pushNotifications')}
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Appearance</h4>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Dark Mode</h5>
              <p className="text-sm text-gray-500">Switch to dark mode theme</p>
            </div>
            <ToggleSwitch 
              enabled={settings.darkMode}
              onToggle={() => handleToggle('darkMode')}
            />
          </div>
        </div>

        {/* Localization Settings */}
        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Localization</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select 
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select 
                value={settings.timezone}
                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Shanghai">Shanghai</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <select 
                value={settings.dateFormat}
                onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
              <select 
                value={settings.timeFormat}
                onChange={(e) => handleSelectChange('timeFormat', e.target.value as '12h' | '24h')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="12h">12 Hour</option>
                <option value="24h">24 Hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Privacy</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Profile Visibility</h5>
                <p className="text-sm text-gray-500">Allow other employees to see your profile</p>
              </div>
              <ToggleSwitch enabled={true} onToggle={() => {}} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Activity Status</h5>
                <p className="text-sm text-gray-500">Show when you're online or away</p>
              </div>
              <ToggleSwitch enabled={true} onToggle={() => {}} />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Security</h4>
          <div className="space-y-3">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Change Password
            </button>
            <br />
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Two-Factor Authentication
            </button>
            <br />
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Download My Data
            </button>
            <br />
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};