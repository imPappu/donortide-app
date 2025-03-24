
export enum Roles {
  User = 'user',
  Admin = 'admin',
  Donor = 'donor',
  ServiceProvider = 'service_provider',
  Volunteer = 'volunteer',
  Organization = 'organization'
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserProfile {
  id: string;
  userId: string;
  bloodType?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  emergencyContact?: string;
  lastDonation?: string;
  donationCount?: number;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
}
