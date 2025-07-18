import React from 'react';
import { Card, Badge } from '@/components/ui';
import { LEAVE_REQUESTS } from '@/utils/mockData';

interface LeaveHistoryProps {
  filterStatus?: string;
  filterType?: string;
}

export const LeaveHistory: React.FC<LeaveHistoryProps> = ({
  filterStatus,
  filterType
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'neutral';
    }
  };

  const filteredRequests = LEAVE_REQUESTS.filter((req) => {
    return (!filterStatus || req.status === filterStatus) &&
           (!filterType || req.type === filterType);
  });

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{request.type}</p>
                <Badge variant={getStatusVariant(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{request.dates}</p>
              <p className="text-sm text-gray-500 mt-1">{request.employee}</p>
              {request.reason && (
                <p className="text-xs text-gray-400 mt-1">Reason: {request.reason}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
