
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

export interface CommunicationRequest {
  name: string;
  phone: string;
  query: string;
  preferredMethod: "call" | "video";
}

// Mock data for consultants
const mockConsultants: Consultant[] = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Hematology", status: "Available", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Dr. Michael Brown", specialty: "Internal Medicine", status: "Available", phone: "+1 (555) 987-6543" },
  { id: 3, name: "Dr. Emily Davis", specialty: "Transfusion Medicine", status: "Busy", phone: "+1 (555) 456-7890" }
];

// Mock data for ambulances
const mockAmbulances: Ambulance[] = [
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
      setTimeout(() => resolve(mockConsultants), 500);
    });
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return [];
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
      setTimeout(() => resolve(mockAmbulances), 500);
    });
  } catch (error) {
    console.error('Error fetching ambulances:', error);
    return [];
  }
};

// Function to submit a communication request
export const submitCommunicationRequest = async (request: CommunicationRequest): Promise<boolean> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/communication/request`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(request),
    // });
    // if (!response.ok) throw new Error('Failed to submit communication request');
    // return true;
    
    // Simulating API call
    return new Promise(resolve => {
      console.log('Communication request submitted:', request);
      setTimeout(() => resolve(true), 800);
    });
  } catch (error) {
    console.error('Error submitting communication request:', error);
    return false;
  }
};
