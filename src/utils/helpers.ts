import { format, parseISO, isValid } from 'date-fns';

// Status and Condition Helpers
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'on-leave': 'bg-yellow-100 text-yellow-800',
    'returned': 'bg-gray-100 text-gray-800',
    'maintenance': 'bg-orange-100 text-orange-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'lost': 'bg-red-100 text-red-800',
    'damaged': 'bg-red-100 text-red-800',
  };
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export const getConditionColor = (condition: string): string => {
  const conditionColors: Record<string, string> = {
    'excellent': 'bg-green-100 text-green-800',
    'good': 'bg-blue-100 text-blue-800',
    'fair': 'bg-yellow-100 text-yellow-800',
    'poor': 'bg-red-100 text-red-800',
  };
  return conditionColors[condition.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'excellent':
      return 'success';
    case 'pending':
    case 'maintenance':
    case 'fair':
      return 'warning';
    case 'rejected':
    case 'inactive':
    case 'poor':
    case 'lost':
    case 'damaged':
      return 'error';
    case 'good':
      return 'info';
    default:
      return 'neutral';
  }