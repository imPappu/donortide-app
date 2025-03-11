
import { API_BASE_URL } from './apiConfig';

// Location service for handling location-related operations

// Get all locations
export const getLocations = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// Get location by ID
export const getLocationById = async (id: string): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`);
    if (!response.ok) throw new Error('Failed to fetch location');
    return await response.json();
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

// Create a new location
export const createLocation = async (locationData: any): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });
    
    if (!response.ok) throw new Error('Failed to create location');
    return await response.json();
  } catch (error) {
    console.error('Error creating location:', error);
    return null;
  }
};

// Update an existing location
export const updateLocation = async (id: string, locationData: any): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });
    
    if (!response.ok) throw new Error('Failed to update location');
    return await response.json();
  } catch (error) {
    console.error('Error updating location:', error);
    return null;
  }
};

// Delete a location
export const deleteLocation = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete location');
    return true;
  } catch (error) {
    console.error('Error deleting location:', error);
    return false;
  }
};

// Geocode an address to get coordinates
export const geocodeAddress = async (address: string): Promise<{lat: number, lng: number} | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });
    
    if (!response.ok) throw new Error('Failed to geocode address');
    return await response.json();
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

// Reverse geocode coordinates to get address
export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/reverse-geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lng }),
    });
    
    if (!response.ok) throw new Error('Failed to reverse geocode coordinates');
    const result = await response.json();
    return result.address;
  } catch (error) {
    console.error('Error reverse geocoding coordinates:', error);
    return null;
  }
};
