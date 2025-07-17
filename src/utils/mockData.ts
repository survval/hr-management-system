import { User, Employee, LeaveRequest, InventoryItem, Activity, Event } from './types';

export const CURRENT_USER: User = {
  name: 'Sarah Johnson',
  role: 'Software Engineer',
  department: 'Engineering',
  email: 'sarah.johnson@company.com',
  phone: '+1 (555) 123-4567',
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b5e3c4f2?w=100&h=100&fit=crop&crop=face'
};

export const EMPLOYEES: Employee[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    department: 'Engineering', 
    status: 'active', 
    lastLogin: '2024-01-15 09:30', 
    email: 'john.doe@company.com' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    department: 'Design', 
    status: 'on-leave', 
    lastLogin: '2024-01-14 17:45', 
    email: 'jane.smith@company.com' 
  },
  { 
    id: 3, 
    name: 'Mike Wilson', 
    department: 'Marketing', 
    status: 'active', 
    lastLogin: '2024-01-15 08:15', 
    email: 'mike.wilson@company.com' 
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    department: 'HR', 
    status: 'active', 
    lastLogin: '2024-01-15 09:00', 
    email: 'emily.brown@company.com' 
  },
  { 
    id: 5, 
    name: 'David Lee', 
    department: 'Sales', 
    status: 'active', 
    lastLogin: '2024-01-15 08:45', 
    email: 'david.lee@company.com' 
  },
  { 
    id: 6, 
    name: 'Lisa Chen', 
    department: 'Finance', 
    status: 'active', 
    lastLogin: '2024-01-15 09:15', 
    email: 'lisa.chen@company.com' 
  },
  { 
    id: 7, 
    name: 'Robert Garcia', 
    department: 'Operations', 
    status: 'active', 
    lastLogin: '2024-01-15 08:30', 
    email: 'robert.garcia@company.com' 
  }
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { 
    id: 1, 
    employee: 'John Doe', 
    type: 'Vacation', 
    dates: 'Jan 20-22', 
    status: 'pending', 
    reason: 'Family vacation to visit relatives' 
  },
  { 
    id: 2, 
    employee: 'Jane Smith', 
    type: 'Sick', 
    dates: 'Jan 15-16', 
    status: 'approved', 
    reason: 'Medical appointment and recovery' 
  },
  { 
    id: 3, 
    employee: 'Mike Wilson', 
    type: 'Personal', 
    dates: 'Jan 18', 
    status: 'approved', 
    reason: 'Personal matters requiring attention' 
  },
  { 
    id: 4, 
    employee: 'Emily Brown', 
    type: 'Annual Leave', 
    dates: 'Jan 25-29', 
    status: 'pending', 
    reason: 'Annual holiday break' 
  },
  { 
    id: 5, 
    employee: 'David Lee', 
    type: 'Sick', 
    dates: 'Jan 12', 
    status: 'approved', 
    reason: 'Flu symptoms' 
  }
];

export const INVENTORY: InventoryItem[] = [
  { 
    id: 1, 
    item: 'MacBook Pro 16"', 
    assignedTo: 'Sarah Johnson', 
    status: 'active', 
    condition: 'excellent', 
    assignedDate: '2024-01-01' 
  },
  { 
    id: 2, 
    item: 'iPhone 14 Pro', 
    assignedTo: 'John Doe', 
    status: 'active', 
    condition: 'good', 
    assignedDate: '2024-01-02' 
  },
  { 
    id: 3, 
    item: 'Dell Monitor 27"', 
    assignedTo: 'Jane Smith', 
    status: 'returned', 
    condition: 'fair', 
    assignedDate: '2024-01-03' 
  },
  { 
    id: 4, 
    item: 'Wireless Mouse', 
    assignedTo: 'Mike Wilson', 
    status: 'active', 
    condition: 'excellent', 
    assignedDate: '2024-01-04' 
  },
  { 
    id: 5, 
    item: 'Mechanical Keyboard', 
    assignedTo: 'Emily Brown', 
    status: 'maintenance', 
    condition: 'good', 
    assignedDate: '2024-01-05' 
  },
  { 
    id: 6, 
    item: 'iPad Pro 12.9"', 
    assignedTo: 'David Lee', 
    status: 'active', 
    condition: 'excellent', 
    assignedDate: '2024-01-06' 
  },
  { 
    id: 7, 
    item: 'Surface Laptop', 
    assignedTo: 'Lisa Chen', 
    status: 'active', 
    condition: 'good', 
    assignedDate: '2024-01-07' 
  },
  { 
    id: 8, 
    item: 'Webcam HD', 
    assignedTo: 'Robert Garcia', 
    status: 'active', 
    condition: 'excellent', 
    assignedDate: '2024-01-08' 
  },
  { 
    id: 9, 
    item: 'Noise-Cancelling Headphones', 
    assignedTo: 'Sarah Johnson', 
    status: 'active', 
    condition: 'good', 
    assignedDate: '2024-01-09' 
  },
  { 
    id: 10, 
    item: 'External Hard Drive 1TB', 
    assignedTo: 'John Doe', 
    status: 'returned', 
    condition: 'fair', 
    assignedDate: '2024-01-10' 
  }
];

export const RECENT_ACTIVITIES: Activity[] = [
  { user: 'John Doe', action: 'clocked in', time: '2 hours ago', type: 'clock-in' },
  { user: 'Jane Smith', action: 'submitted leave request', time: '4 hours ago', type: 'leave' },
  { user: 'Mike Wilson', action: 'returned equipment', time: '1 day ago', type: 'inventory' },
  { user: 'Emily Brown', action: 'updated profile', time: '2 days ago', type: 'profile' },
  { user: 'David Lee', action: 'clocked out', time: '3 hours ago', type: 'clock-in' },
  { user: 'Lisa Chen', action: 'requested new equipment', time: '5 hours ago', type: 'inventory' },
  { user: 'Robert Garcia', action: 'submitted timesheet', time: '1 day ago', type: 'clock-in' },
  { user: 'Sarah Johnson', action: 'updated emergency contact', time: '3 days ago', type: 'profile' }
];

export const UPCOMING_EVENTS: Event[] = [
  { name: 'Alice Cooper', type: 'Birthday', date: 'Today', department: 'Marketing' },
  { name: 'Bob Johnson', type: 'Birthday', date: 'Tomorrow', department: 'Engineering' },
  { name: 'Team Meeting', type: 'Meeting', date: 'Jan 18', department: 'All Departments' },
  { name: 'Carol Davis', type: 'Anniversary', date: 'Jan 20', department: 'HR' },
  { name: 'Product Launch Meeting', type: 'Meeting', date: 'Jan 22', department: 'Product Team' },
  { name: 'Monthly Review', type: 'Meeting', date: 'Jan 25', department: 'Management' },
  { name: 'Tom Wilson', type: 'Birthday', date: 'Jan 28', department: 'Sales' },
  { name: 'Quarterly Planning', type: 'Meeting', date: 'Jan 30', department: 'All Departments' }
];

// Additional mock data for enhanced functionality
export const NOTIFICATIONS = [
  {
    id: 1,
    message: 'New leave request from John Doe',
    time: '2 hours ago',
    type: 'leave',
    read: false
  },
  {
    id: 2,
    message: 'Equipment return reminder - Dell Monitor due',
    time: '4 hours ago',
    type: 'inventory',
    read: false
  },
  {
    id: 3,
    message: 'Monthly report is ready for review',
    time: '1 day ago',
    type: 'report',
    read: true
  },
  {
    id: 4,
    message: 'Team meeting scheduled for tomorrow',
    time: '2 days ago',
    type: 'meeting',
    read: true
  },
  {
    id: 5,
    message: 'Payroll processed successfully',
    time: '3 days ago',
    type: 'payroll',
    read: true
  }
];

export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Product'
];

export const TIME_TRACKING_DATA = {
  todayHours: '7h 30m',
  weeklyHours: ['8h', '8h', '7h 30m', '8h', '6h', '0h', '0h'],
  monthlyStats: {
    totalDays: 22,
    presentDays: 20,
    lateDays: 2,
    absentDays: 0
  }
};