
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
}

export type StaffRole = 'admin' | 'manager' | 'editor' | 'staff';
