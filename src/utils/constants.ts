import { Home, Clock, User, Package, FileText } from 'lucide-react';

// Navigation Configuration
export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'leave', label: 'Leave Management', icon: FileText },
];

// Time Tracking Configuration
export const CLOCK_IN_METHODS = [
  { id: 'manual', label: 'Manual' },
  { id: 'qr', label: 'QR Code' },
  { id: 'biometric', label: 'Biometric' },
  { id: 'geo', label: 'Geo-Tag' }
];

// Leave Management Configuration
export const LEAVE_TYPES = [
  'Annual Leave',
  'Sick Leave',
  'Personal Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Emergency Leave',
  'Study Leave',
  'Bereavement Leave'
];

// Inventory Configuration
export const ASSET_CONDITIONS = [
  'Excellent',
  'Good',
  'Fair',
  'Poor'
];

export const ASSET_STATUSES = [
  'Active',
  'Returned',
  'Maintenance',
  'Lost',
  'Damaged'
];

export const ASSET_CATEGORIES = [
  'Laptop',
  'Desktop',
  'Mobile Device',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Headset',
  'Camera',
  'Tablet',
  'Accessories',
  'Software License'
];

// Employee Configuration
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Product',
  'Customer Support',
  'Legal'
];

export const EMPLOYEE_ROLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Engineer',
  'Engineering Manager',
  'Product Manager',
  'Designer',
  'UX/UI Designer',
  'Marketing Manager',
  'Sales Representative',
  'Account Manager',
  'HR Manager',
  'HR Specialist',
  'Finance Manager',
  'Accountant',
  'Operations Manager',
  'Customer Support Specialist',
  'DevOps Engineer',
  'Data Analyst',
  'Business Analyst',
  'Project Manager'
];

export const EMPLOYEE_STATUSES = [
  'Active',
  'On Leave',
  'Inactive',
  'Terminated'
];

// Time and Date Configuration
export const TIME_FORMATS = {
  '12h': 'h:mm A',
  '24h': 'HH:mm'
};

export const DATE_FORMATS = {
  'US': 'MM/DD/YYYY',
  'EU': 'DD/MM/YYYY',
  'ISO': 'YYYY-MM-DD'
};

export const WORKING_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

// Notification Configuration
export const NOTIFICATION_TYPES = {
  LEAVE: 'leave',
  INVENTORY: 'inventory',
  REPORT: 'report',
  MEETING: 'meeting',
  PAYROLL: 'payroll',
  GENERAL: 'general'
};

// UI Configuration
export const TOAST_DURATION = 5000; // milliseconds

export const PAGINATION_SIZES = [10, 25, 50, 100];

export const TABLE_PAGE_SIZE = 10;

// Color Schemes
export const STATUS_COLORS = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800'
};

export const CONDITION_COLORS = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  fair: 'bg-yellow-100 text-yellow-800',
  poor: 'bg-red-100 text-red-800'
};

// Form Validation
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// API Configuration
export const API_ENDPOINTS = {
  auth: '/api/auth',
  employees: '/api/employees',
  leave: '/api/leave',
  inventory: '/api/inventory',
  timeTracking: '/api/time-tracking',
  dashboard: '/api/dashboard'
};

// File Upload Configuration
export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxFiles: 5
};

// Default Settings
export const DEFAULT_USER_SETTINGS = {
  emailNotifications: true,
  pushNotifications: false,
  darkMode: false,
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h' as const
};

export const DEFAULT_COMPANY_SETTINGS = {
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY'
};

// Chart Configuration
export const CHART_COLORS = [
  '#4A90E2',
  '#50E3C2',
  '#F5A623',
  '#D0021B',
  '#9013FE',
  '#00C853',
  '#FF6D00',
  '#E91E63'
];

// Application Metadata
export const APP_INFO = {
  name: 'HR Management System',
  version: '1.0.0',
  description: 'Modern HR Management System for startups',
  author: 'Your Company',
  website: 'https://yourcompany.com'
};