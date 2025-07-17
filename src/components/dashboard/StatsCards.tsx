import React from 'react';
import { Users, Clock, FileText, Package } from 'lucide-react';
import { Card } from '@/components/ui';
import { EMPLOYEES, LEAVE_REQUESTS, INVENTORY } from '@/utils/mockData';

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: EMPLOYEES.length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Present Today',
      value: EMPLOYEES.filter(emp => emp.status === 'active').length,
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Pending Leaves',
      value: LEAVE_REQUESTS.filter(req => req.status === 'pending').length,
      icon: FileText,
      color: 'yellow'
    },
    {
      title: 'Active Assets',
      value: INVENTORY.filter(item => item.status === 'active').length,
      icon: Package,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};