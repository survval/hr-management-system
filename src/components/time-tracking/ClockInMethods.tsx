import React from 'react';
import { Clock, QrCode, Fingerprint, MapPin } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useToast } from '@/hooks/useToast';

interface ClockInMethodsProps {
  clockInMethod: string;
  setClockInMethod: (method: string) => void;
  isClocked: boolean;
  setIsClocked: (status: boolean) => void;
  currentTime: string;
}

export const ClockInMethods: React.FC<ClockInMethodsProps> = ({
  clockInMethod,
  setClockInMethod,
  isClocked,
  setIsClocked,
  currentTime
}) => {
  const { showToast } = useToast();

  const methods = [
    { id: 'manual', label: 'Manual', icon: Clock },
    { id: 'qr', label: 'QR Code', icon: QrCode },
    { id: 'biometric', label: 'Biometric', icon: Fingerprint },
    { id: 'geo', label: 'Geo-Tag', icon: MapPin }
  ];

  const handleClockIn = () => {
    const messages: Record<string, string> = {
      manual: 'Manual clock-in successful!',
      qr: 'QR code scanned successfully!',
      biometric: 'Biometric authentication completed!',
      geo: 'Location verified and clocked in!'
    };
    
    setIsClocked(!isClocked);
    showToast(messages[clockInMethod]);
  };

  const renderMethodContent = () => {
    switch (clockInMethod) {
      case 'manual':
        return (
          <div className="text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">Click the button below to clock in manually</p>
            <div className="text-2xl font-bold text-gray-900 mb-2">{currentTime}</div>
          </div>
        );
      case 'qr':
        return (
          <div className="text-center">
            <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">Scan QR code to clock in</p>
            <div className="w-24 h-24 bg-black mx-auto rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">QR Code</span>
            </div>
          </div>
        );
      case 'biometric':
        return (
          <div className="text-center">
            <Fingerprint className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">Place finger on scanner</p>
            <div className="w-16 h-16 bg-blue-100 mx-auto rounded-full flex items-center justify-center">
              <Fingerprint className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        );
      case 'geo':
        return (
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">Allow location access to clock in</p>
            <div className="text-sm text-gray-500">Location: Office Building, Floor 3</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Clock In/Out</h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {methods.map(method => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setClockInMethod(method.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                  clockInMethod === method.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          {renderMethodContent()}
        </div>

        <Button
          onClick={handleClockIn}
          variant={isClocked ? 'danger' : 'success'}
          className="w-full"
          size="lg"
        >
          {isClocked ? 'Clock Out' : 'Clock In'}
        </Button>
      </div>
    </Card>
  );
};