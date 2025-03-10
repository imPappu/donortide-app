
export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  goal?: number;
  currentAmount?: number;
  currency?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  imageUrl?: string;
  category: string;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
}

export interface CampaignFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  goal?: number;
  currency?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  imageUrl?: string;
  category: string;
}
