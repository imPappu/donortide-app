
import { StaffMember } from '@/components/admin/staff/types';

// Mock data for demo purposes
const MOCK_STAFF: StaffMember[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'admin', 
    isActive: true, 
    lastLogin: '2023-05-15T10:30:00Z' 
  },
  { 
    id: '2', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'manager', 
    isActive: true, 
    lastLogin: '2023-05-14T09:15:00Z' 
  },
  { 
    id: '3', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'staff', 
    isActive: true, 
    lastLogin: '2023-05-13T14:22:00Z' 
  },
  { 
    id: '4', 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    role: 'editor', 
    isActive: true, 
    lastLogin: '2023-05-12T11:45:00Z' 
  }
];

// This would typically be an API call to fetch staff members
export const fetchStaffMembers = async (): Promise<StaffMember[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...MOCK_STAFF];
};

// This would typically be an API call to add a staff member
export const addStaffMember = async (staff: Omit<StaffMember, 'id' | 'lastLogin'>): Promise<StaffMember> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newStaff: StaffMember = {
    ...staff,
    id: (MOCK_STAFF.length + 1).toString(),
    lastLogin: 'Never'
  };
  
  MOCK_STAFF.push(newStaff);
  return newStaff;
};

// This would typically be an API call to update a staff member
export const updateStaffMember = async (staff: StaffMember): Promise<StaffMember> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = MOCK_STAFF.findIndex(s => s.id === staff.id);
  if (index !== -1) {
    MOCK_STAFF[index] = staff;
    return staff;
  }
  
  throw new Error(`Staff member with ID ${staff.id} not found`);
};

// This would typically be an API call to delete a staff member
export const deleteStaffMember = async (id: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = MOCK_STAFF.findIndex(s => s.id === id);
  if (index !== -1) {
    MOCK_STAFF.splice(index, 1);
    return;
  }
  
  throw new Error(`Staff member with ID ${id} not found`);
};
