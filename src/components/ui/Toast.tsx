import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Toast as ToastType } from '@/utils/types';

interface ToastProps {
  toast: ToastType;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${getBackgroundColor()} text-white max-w-sm`}>
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="text-sm">{toast.message}</span>
      </div>
    </div>
  );
};