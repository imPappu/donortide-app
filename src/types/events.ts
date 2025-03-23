
export interface EventType {
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
  organizerId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventCardProps {
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  attendeesCount?: number;
  maxAttendees?: number;
  status: string;
  onClick: () => void;
}
