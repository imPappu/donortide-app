
// API types for the application

export interface Donor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  bloodType: string;
  location: string;
  lastDonation?: string;
  totalDonations: number;
  availableForEmergency: boolean;
  status?: 'available' | 'unavailable' | 'pending';
  createdAt: string;
  contactNumber?: string; // Added for compatibility
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  location: string;
  contactNumber: string;
  urgency: 'critical' | 'urgent' | 'standard';
  notes?: string;
  status: 'open' | 'fulfilled' | 'closed';
  createdAt: string;
  fulfilledAt?: string;
}

export interface AppSetting {
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedAt?: string;
}

export interface Banner {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  link?: string;
  description?: string; // Added for compatibility with BannerBasicFields
  linkUrl?: string; // Added for compatibility with BannerBasicFields
  displayOrder?: number; // Added for compatibility with BannerBasicFields
  startDate: string;
  endDate?: string;
  isActive: boolean;
  position?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl?: string;
  tags?: string[];
  category?: string; // Added for compatibility with BlogPostBasicFields
  publishDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: string;
  progress: number;
  startDate: string;
  endDate: string;
  organizer: string;
  image?: string;
  status: 'active' | 'completed' | 'draft';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  image?: string;
  attendees?: number;
  capacity?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'request' | 'donation' | 'event' | 'campaign';
  read: boolean;
  targetType?: string; // Added for notification targeting
  action?: {
    type: string;
    payload: any;
  };
  createdAt: string;
}

export interface Payment {
  id: string;
  userId?: string;
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  updatedAt?: string;
  paymentDetails?: any;
}

export interface DatabaseConfig {
  host: string;
  name: string; // Changed from database to name for consistency
  user: string;
  password: string;
  port?: string;
  ssl?: boolean;
  type?: string; // Added for compatibility
}

export interface AdminUser {
  username: string;
  email: string;
  password: string;
}
