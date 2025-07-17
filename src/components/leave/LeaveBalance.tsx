import React, { useState } from 'react';
import { Calendar, Clock, Info, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

interface LeaveType {
  type: string;
  total: number;
  used: number;
  pending: number;
  remaining: number;
  color: string;
  icon: string;
  description: string;
  expiryDate?: string;
}

export const LeaveBalance: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Mock leave balance data
  const leaveBalances: LeaveType[] = [
    {
      type: 'Annual Leave',
      total: 25,
      used: 8,
      pending: 3,
      remaining: 14,
      color: 'blue',
      icon: '🏖️',
      description: 'Vacation and personal time off',
      expiryDate: '2024-12-31'
    },
    {
      type: 'Sick Leave',
      total: 12,
      used: 2,
      pending: 0,
      remaining: 10,
      color: 'red',
      icon: '🏥',
      description: 'Medical leave and health-related absences'
    },
    {
      type: 'Personal Leave',
      total: 5,
      used: 1,
      pending: 0,
      remaining: 4,
      color: 'purple',
      icon: '👤',
      description: 'Personal matters and family time'
    },
    {
      type: 'Maternity Leave',
      total: 90,
      used: 0,
      pending: 0,
      remaining: 90,
      color: 'pink',
      icon: '👶',
      description: 'Maternity and parental leave'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }
    };
    return colors[color] || colors.blue;
  };

  const getProgressColor = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage > 75) return { variant: 'success' as const, text: 'Excellent' };
    if (percentage > 50) return { variant: 'info' as const, text: 'Good' };
    if (percentage > 25) return { variant: 'warning' as const, text: 'Limited' };
    return { variant: 'error' as const, text: 'Critical' };
  };

  const totalAvailableDays = leaveBalances.reduce((sum, leave) => sum + leave.remaining, 0);
  const totalUsedDays = leaveBalances.reduce((sum, leave) => sum + leave.used, 0);
  const totalPendingDays = leaveBalances.reduce((sum, leave) => sum + leave.pending, 0);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Leave Balance</h3>
          <p className="text-sm text-gray-500 mb-4">Your current leave entitlements</p>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{totalAvailableDays}</p>
              <p className="text-xs text-gray-500">Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalUsedDays}</p>
              <p className="text-xs text-gray-500">Used</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{totalPendingDays}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Leave Types */}
      <div className="space-y-3">
        {leaveBalances.map((leave, index) => {
          const colorClasses = getColorClasses(leave.color);
          const statusBadge = getStatusBadge(leave.remaining, leave.total);
          const usagePercentage = ((leave.used + leave.pending) / leave.total) * 100;
          
          return (
            <Card key={index} className={`${colorClasses.bg} ${colorClasses.border} border transition-all duration-200 hover:shadow-md`}>
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{leave.icon}</span>
                    <div>
                      <h4 className={`font-medium ${colorClasses.text}`}>{leave.type}</h4>
                      <p className="text-xs text-gray-600">{leave.description}</p>
                    </div>
                  </div>
                  <Badge variant={statusBadge.variant} size="sm">
                    {statusBadge.text}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Usage</span>
                    <span className={colorClasses.text}>
                      {leave.used + leave.pending} / {leave.total} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(leave.remaining, leave.total)}`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className={`font-semibold ${colorClasses.text}`}>{leave.remaining}</p>
                    <p className="text-xs text-gray-500">Remaining</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">{leave.used}</p>
                    <p className="text-xs text-gray-500">Used</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-600">{leave.pending}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>

                {/* Expiry Warning */}
                {leave.expiryDate && (
                  <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>Expires: {new Date(leave.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-gray-50 border-gray-200">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-gray-900 mb-1">Leave Policy</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Leave requests require manager approval</li>
              <li>• Submit requests at least 7 days in advance</li>
              <li>• Annual leave expires at year-end</li>
              <li>• Sick leave carries over to next year</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Year Progress */}
      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Year Progress</h4>
            <span className="text-sm text-gray-500">2024</span>
          </div>
          
          {(() => {
            const now = new Date();
            const yearStart = new Date(now.getFullYear(), 0, 1);
            const yearEnd = new Date(now.getFullYear(), 11, 31);
            const yearProgress = ((now.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100;
            
            return (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${yearProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Jan 1</span>
                  <span>{Math.round(yearProgress)}% complete</span>
                  <span>Dec 31</span>
                </div>
              </>
            );
          })()}
        </div>
      </Card>

      {/* Quick Stats */}
      <Card>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">This Year's Summary</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                Days taken this year
              </span>
              <span className="font-medium text-gray-900">{totalUsedDays} days</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                Average per month
              </span>
              <span className="font-medium text-gray-900">{(totalUsedDays / new Date().getMonth() || 1).toFixed(1)} days</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                Projected year-end
              </span>
              <span className="font-medium text-gray-900">
                {Math.round((totalUsedDays / (new Date().getMonth() + 1)) * 12)} days
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};