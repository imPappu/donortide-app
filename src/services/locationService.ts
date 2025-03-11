
import { MAP_CONFIG } from './apiConfig';

// Location data structure
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

// Get current user location
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        resolve(locationData);
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true }
    );
  });
};

// Start tracking user location in background
let watchId: number | null = null;

export const startLocationTracking = (
  onLocationUpdate: (location: LocationData) => void,
  onError?: (error: GeolocationPositionError) => void
): void => {
  if (!navigator.geolocation) {
    if (onError) onError({ code: 0, message: 'Geolocation is not supported', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as GeolocationPositionError);
    return;
  }

  // Stop any existing tracking
  stopLocationTracking();

  // Start watching position
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };
      onLocationUpdate(locationData);
    },
    (error) => {
      if (onError) onError(error);
    },
    { 
      enableHighAccuracy: true,
      maximumAge: 30000, // 30 seconds
      timeout: 27000 // 27 seconds
    }
  );
};

// Stop tracking user location
export const stopLocationTracking = (): void => {
  if (watchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};

// Save user location to server
export const saveUserLocation = async (location: LocationData, userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    
    if (!response.ok) throw new Error('Failed to save location');
    
    return true;
  } catch (error) {
    console.error('Error saving user location:', error);
    return false;
  }
};

// Get nearby donors based on user location and blood type
export const getNearbyDonors = async (
  location: LocationData,
  bloodType: string,
  radiusKm: number = 10
): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/nearby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        bloodType,
        radiusKm
      }),
    });
    
    if (!response.ok) throw new Error('Failed to fetch nearby donors');
    
    return await response.json();
  } catch (error) {
    console.error('Error finding nearby donors:', error);
    return [];
  }
};

// Calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  // Implementation of the Haversine formula to calculate distance in kilometers
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
