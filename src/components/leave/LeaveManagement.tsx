import React, { useState } from 'react';
import { Plus, Calendar, Filter, Download, Users, Clock, TrendingUp, Settings } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { LeaveBalance } from './LeaveBalance';
import { LeaveHistory } from './LeaveHistory';
import { LeaveModal } from './LeaveModal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { LEAVE_REQUESTS, CURRENT_USER } from '@/utils/mockData';

export const LeaveManagement: React.FC = () => {
  const { isOpen: isLeaveModalOpen, openModal: openLeaveModal, closeModal: closeLeaveModal } = useModal();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Calculate statistics
  const totalRequests = LEAVE_REQUESTS.length;
  const pendingRequests = LEAVE_REQUESTS.filter(req => req.status === 'pending').length;
  const approvedRequests = LEAVE_REQUESTS.filter(req => req.status === 'approved').length;
  const rejectedRequests = LEAVE_REQUESTS.filter(req => req.status === 'rejected').length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Leave data refreshed successfully!', 'success');
    }, 1500);
  };

  const handleExportData = () => {
    // Create CSV content
    const headers = ['Employee', 'Type', 'Dates', 'Status', 'Reason'];
    const csvContent = [
      headers.join(','),
      ...LEAVE_REQUESTS.map(req => [
        `"${req.employee}"`,
        req.type,
        `"${req.dates}"`,
        req.status,
        `"${req.reason || ''}"`
      ].join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leave-requests-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showToast('Leave data exported successfully!', 'success');
  };

  const handleTeamCalendar = () => {
    showToast('Team calendar view coming soon!', 'info');
    // In a real app, this would open a calendar view
  };

  const handleSettings = () => {
    showToast('Leave settings panel would open here', 'info');
    // In a real app, this would open leave policy configuration
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your leave requests, track balances, and view team availability
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="secondary"
            onClick={handleRefresh}
            icon={isRefreshing ? undefined : TrendingUp}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                Refreshing...
              </>
            ) : (
              'Refresh'
            )}
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleTeamCalendar}
            icon={Calendar}
          >
            Team Calendar
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleExportData}
            icon={Download}
          >
            Export Data
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleSettings}
            icon={Settings}
          >
            Settings
          </Button>
          
          <Button 
            onClick={openLeaveModal}
            icon={Plus}
          >
            Apply Leave
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedRequests}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{rejectedRequests}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Leave Requests Overview</h3>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your leave requests and team availability
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
              <option value="annual">Annual Leave</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Leave Balance - Takes 1 column */}
        <div className="lg:col-span-1">
          <LeaveBalance />
        </div>
        
        {/* Leave History - Takes 3 columns */}
        <div className="lg:col-span-3">
          <LeaveHistory 
            filterStatus={filterStatus}
            filterType={filterType}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Plan Your Leave</h3>
            <p className="text-sm text-gray-600 mb-4">
              Check your leave balance and plan your time off in advance
            </p>
            <Button onClick={openLeaveModal} size="sm">
              Apply Now
            </Button>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Team Calendar</h3>
            <p className="text-sm text-gray-600 mb-4">
              View team availability and coordinate your leave requests
            </p>
            <Button onClick={handleTeamCalendar} variant="secondary" size="sm">
              View Calendar
            </Button>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-100">
            <Download className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Leave Reports</h3>
            <p className="text-sm text-gray-600 mb-4">
              Export your leave history and generate reports for records
            </p>
            <Button onClick={handleExportData} variant="secondary" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Leave Application Modal */}
      <LeaveModal 
        isOpen={isLeaveModalOpen}
        onClose={closeLeaveModal}
      />
    </div>
  );
};