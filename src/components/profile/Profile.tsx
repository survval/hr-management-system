import React from 'react';
import { ProfileCard } from './ProfileCard';
import { PersonalInfo } from './PersonalInfo';
import { EmergencyContact } from './EmergencyContact';
import { AccountSettings } from './AccountSettings';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard />
        <div className="lg:col-span-2">
          <PersonalInfo />
        </div>
      </div>

      <EmergencyContact />
      <AccountSettings />
    </div>
  );
};