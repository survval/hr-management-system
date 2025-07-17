// User and Authentication Types
export interface User {
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  photo: string;
  id?: number;
  employeeId?: string;
  joinDate?: string;
  address?: string;
}

// Employee Management Types
export interface Employee {
  id: number;
  name: string;
  department: string;
  status: 'active' | 'on-leave' | 'inactive';
  lastLogin: string;
  email: string;
  phone?: string;
  role?: string;
  photo?: string;
  employeeId?: string;
  joinDate?: string;
}

// Leave Management Types
export interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  dates: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  startDate?: string;
  endDate?: string;
  submittedDate?: string;
  approvedBy?: string;
  comments?: string;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

// Inventory Management Types
export interface InventoryItem {
  id: number;
  item: string;
  assignedTo: string;
  status: 'active' | 'returned' | 'maintenance' | 'lost' | 'damaged';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  assignedDate?: string;
  returnDate?: string;
  serialNumber?: string;
  cost?: number;
  warranty?: string;
  notes?: string;
}

// UI and Notification Types
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'leave' | 'inventory' | 'report' | 'meeting' | 'payroll' | 'general';
  read: boolean;
  actionUrl?: string;
}

// Activity and Events Types
export interface Activity {
  user: string;
  action: string;
  time: string;
  type: 'clock-in' | 'leave' | 'inventory' | 'profile' | 'general';
  details?: string;
}

export interface Event {
  name: string;
  type: 'Birthday' | 'Meeting' | 'Anniversary' | 'Holiday' | 'Training';
  date: string;
  department: string;
  description?: string;
  location?: string;
}

// Time Tracking Types
export interface TimeEntry {
  id: number;
  employeeId: number;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  status: 'present' | 'late' | 'absent' | 'half-day';
  method: 'manual' | 'qr' | 'biometric' | 'geo';
  location?: string;
}

export interface TimeStats {
  totalHours: string;
  avgDailyHours: string;
  overtimeHours: string;
  presentDays: number;
  lateDays: number;
  absentDays: number;
}

// Form and Component Types
export interface FormData {
  [key: string]: string | number | boolean | Date;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

// Navigation and Layout Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: any; // Lucide icon component
  href?: string;
  children?: NavigationItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  action: () => void;
  icon?: any;
  disabled?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Settings and Configuration Types
export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

export interface CompanySettings {
  name: string;
  logo: string;
  timezone: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  leaveTypes: string[];
  departments: string[];
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  pendingLeaves: number;
  activeAssets: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}