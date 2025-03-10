
// Shared type definitions for the application

export interface BloodRequest {
  id?: string;
  patientName: string;
  bloodType: string;
  hospital: string;
  location: string;
  contactNumber: string;
  urgency: 'Standard' | 'High' | 'Urgent';
  notes?: string;
  createdAt?: string;
}

export interface Donor {
  id?: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation?: string;
  contactNumber: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Banner {
  id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  active?: boolean;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppSetting {
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedAt?: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  targetType: 'all' | 'donors' | 'specific_users';
  targetData?: object;
  status?: 'pending' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  createdAt?: string;
}

export interface Payment {
  id?: string;
  userId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'paypal' | 'stripe' | 'esewa' | 'ime' | 'upi';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentDetails?: object;
  createdAt?: string;
  updatedAt?: string;
}

export interface DatabaseConfig {
  host: string;
  database: string;
  user: string;
  password: string;
}

export interface AdminUser {
  username: string;
  email: string;
  password: string;
}
