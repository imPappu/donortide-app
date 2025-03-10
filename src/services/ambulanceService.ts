
import { API_BASE_URL } from './apiConfig';
import { Ambulance } from './types/serviceTypes';

// Mock data for ambulances
let mockAmbulances: Ambulance[] = [
  { id: 1, vehicleNumber: "AMB-001", location: "Downtown Medical Center", status: "Available", driverName: "John Smith", driverPhone: "+1 (555) 111-2222" },
  { id: 2, vehicleNumber: "AMB-002", location: "Westside Hospital", status: "On Duty", driverName: "Robert Johnson", driverPhone: "+1 (555) 333-4444" },
  { id: 3, vehicleNumber: "AMB-003", location: "Northside Medical Center", status: "Available", driverName: "Lisa Adams", driverPhone: "+1 (555) 555-6666" }
];

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
