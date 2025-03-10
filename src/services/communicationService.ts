
import { API_BASE_URL } from './apiConfig';
import { CommunicationRequest } from './types/serviceTypes';

// Function to submit a communication request
export const submitCommunicationRequest = async (request: CommunicationRequest): Promise<boolean> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/communication`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    // });
    // if (!response.ok) throw new Error('Failed to submit communication request');
    // return true;
    
    // Using mock data for now
    return new Promise(resolve => {
      console.log('Communication request submitted:', request);
      setTimeout(() => resolve(true), 500);
    });
  } catch (error) {
    console.error('Error submitting communication request:', error);
    return false;
  }
};
