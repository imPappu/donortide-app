
// Common types for services
export interface Consultant {
  id: number;
  name: string;
  specialty: string;
  status: string;
  phone: string;
  imageUrl?: string;
  availableDays: string[]; // ["Monday", "Tuesday", etc.]
  availableTimeStart: string; // "09:00"
  availableTimeEnd: string; // "17:00"
  isFreeService: boolean;
  price?: number;
}

export interface Ambulance {
  id: number;
  vehicleNumber: string;
  location: string;
  status: "Available" | "On Duty";
  driverName: string;
  driverPhone: string;
  availableDays: string[]; // ["Monday", "Tuesday", etc.]
  availableTimeStart: string; // "09:00"
  availableTimeEnd: string; // "17:00"
  isFreeService: boolean;
  price?: number;
}

export interface CommunicationRequest {
  name: string;
  phone: string;
  query: string;
  preferredMethod: "call" | "video";
}
