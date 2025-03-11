
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
  action?: {
    type: string;
    payload: any;
  };
  createdAt: string;
}

export interface DatabaseConfig {
  host: string;
  database: string;
  user: string;
  password: string;
  port?: string;
  ssl?: boolean;
}

export interface AdminUser {
  username: string;
  email: string;
  password: string;
}
