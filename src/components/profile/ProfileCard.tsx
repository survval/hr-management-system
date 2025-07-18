import React from 'react';
import Image from 'next/image';
import { Camera, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui';
import { CURRENT_USER } from '@/utils/mockData';

export const ProfileCard: React.FC = () => {
  return (
    <Card>
      <div className="relative text-center">
        <div className="relative inline-block">
          <Image
            src={CURRENT_USER.photo}
            alt={CURRENT_USER.name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover mx-auto"
            priority
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-900">{CURRENT_USER.name}</h3>
        <p className="text-sm text-gray-600">{CURRENT_USER.role}</p>
        <p className="text-sm text-gray-500">{CURRENT_USER.department}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{CURRENT_USER.email}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{CURRENT_USER.phone}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
