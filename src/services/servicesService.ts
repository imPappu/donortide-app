
import { API_BASE_URL } from './apiConfig';

// Types for services
export interface Consultant {
  id: number;
  name: string;
  specialty: string;
  status: string;
  phone: string;
  imageUrl?: string;
}

export interface Ambulance {
  id: number;
  vehicleNumber: string;
  location: string;
  status: "Available" | "On Duty";
  driverName: string;
  driverPhone: string;
}

// Mock data for consultants
let mockConsultants: Consultant[] = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Hematology", status: "Available", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Dr. Michael Brown", specialty: "Internal Medicine", status: "Available", phone: "+1 (555) 987-6543" },
  { id: 3, name: "Dr. Emily Davis", specialty: "Transfusion Medicine", status: "Busy", phone: "+1 (555) 456-7890" }
];

// Mock data for ambulances
let mockAmbulances: Ambulance[] = [
  { id: 1, vehicleNumber: "AMB-001", location: "Downtown Medical Center", status: "Available", driverName: "John Smith", driverPhone: "+1 (555) 111-2222" },
  { id: 2, vehicleNumber: "AMB-002", location: "Westside Hospital", status: "On Duty", driverName: "Robert Johnson", driverPhone: "+1 (555) 333-4444" },
  { id: 3, vehicleNumber: "AMB-003", location: "Northside Medical Center", status: "Available", driverName: "Lisa Adams", driverPhone: "+1 (555) 555-6666" }
];

// Function to fetch consultants
export const getConsultants = async (): Promise<Consultant[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/consultants`);
    // if (!response.ok) throw new Error('Failed to fetch consultants');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockConsultants]), 500);
    });
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return [];
  }
};

// Function to add a new consultant
export const addConsultant = async (consultant: Omit<Consultant, 'id'>): Promise<Consultant> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/consultants`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(consultant),
    // });
    // if (!response.ok) throw new Error('Failed to add consultant');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      const newConsultant = {
        ...consultant,
        id: Math.max(0, ...mockConsultants.map(c => c.id)) + 1
      };
      mockConsultants.push(newConsultant);
      setTimeout(() => resolve(newConsultant), 500);
    });
  } catch (error) {
    console.error('Error adding consultant:', error);
    throw error;
  }
};

// Function to update a consultant
export const updateConsultant = async (consultant: Consultant): Promise<Consultant> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/consultants/${consultant.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(consultant),
    // });
    // if (!response.ok) throw new Error('Failed to update consultant');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      const index = mockConsultants.findIndex(c => c.id === consultant.id);
      if (index !== -1) {
        mockConsultants[index] = consultant;
      }
      setTimeout(() => resolve(consultant), 500);
    });
  } catch (error) {
    console.error('Error updating consultant:', error);
    throw error;
  }
};

// Function to delete a consultant
export const deleteConsultant = async (id: number): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/consultants/${id}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Failed to delete consultant');
    
    // Using mock data for now
    return new Promise(resolve => {
      mockConsultants = mockConsultants.filter(c => c.id !== id);
      setTimeout(() => resolve(), 500);
    });
  } catch (error) {
    console.error('Error deleting consultant:', error);
    throw error;
  }
};

// Function to fetch ambulances
export const getAmbulances = async (): Promise<Ambulance[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/ambulances`);
    // if (!response.ok) throw new Error('Failed to fetch ambulances');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockAmbulances]), 500);
    });
  } catch (error) {
    console.error('Error fetching ambulances:', error);
    return [];
  }
};

// Function to add a new ambulance
export const addAmbulance = async (ambulance: Omit<Ambulance, 'id'>): Promise<Ambulance> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/ambulances`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(ambulance),
    // });
    // if (!response.ok) throw new Error('Failed to add ambulance');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      const newAmbulance = {
        ...ambulance,
        id: Math.max(0, ...mockAmbulances.map(a => a.id)) + 1
      };
      mockAmbulances.push(newAmbulance);
      setTimeout(() => resolve(newAmbulance), 500);
    });
  } catch (error) {
    console.error('Error adding ambulance:', error);
    throw error;
  }
};

// Function to update an ambulance
export const updateAmbulance = async (ambulance: Ambulance): Promise<Ambulance> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/ambulances/${ambulance.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(ambulance),
    // });
    // if (!response.ok) throw new Error('Failed to update ambulance');
    // return await response.json();
    
    // Using mock data for now
    return new Promise(resolve => {
      const index = mockAmbulances.findIndex(a => a.id === ambulance.id);
      if (index !== -1) {
        mockAmbulances[index] = ambulance;
      }
      setTimeout(() => resolve(ambulance), 500);
    });
  } catch (error) {
    console.error('Error updating ambulance:', error);
    throw error;
  }
};

// Function to delete an ambulance
export const deleteAmbulance = async (id: number): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/ambulances/${id}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Failed to delete ambulance');
    
    // Using mock data for now
    return new Promise(resolve => {
      mockAmbulances = mockAmbulances.filter(a => a.id !== id);
      setTimeout(() => resolve(), 500);
    });
  } catch (error) {
    console.error('Error deleting ambulance:', error);
    throw error;
  }
};
