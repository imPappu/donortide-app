
// This service file defines how your frontend communicates with your PostgreSQL backend
// You'll need to replace the base URL with your actual API endpoint once deployed

const API_BASE_URL = 'https://your-cpanel-domain.com/api'; // Replace with your actual API endpoint

// Types
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

// Blood Request API functions
export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) throw new Error('Failed to fetch blood requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    return [];
  }
};

export const createBloodRequest = async (request: BloodRequest): Promise<BloodRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Failed to create blood request');
    return await response.json();
  } catch (error) {
    console.error('Error creating blood request:', error);
    return null;
  }
};

// Donor API functions
export const getDonors = async (): Promise<Donor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`);
    if (!response.ok) throw new Error('Failed to fetch donors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donors:', error);
    return [];
  }
};

export const registerDonor = async (donor: Donor): Promise<Donor | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donor),
    });
    
    if (!response.ok) throw new Error('Failed to register donor');
    return await response.json();
  } catch (error) {
    console.error('Error registering donor:', error);
    return null;
  }
};

// Add more API functions as needed
