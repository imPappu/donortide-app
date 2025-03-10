
// Common types for services
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
