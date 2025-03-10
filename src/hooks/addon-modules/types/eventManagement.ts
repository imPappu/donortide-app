
import { User } from '@/types/auth';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  capacity: number;
  registrations: number;
  organizer: string;
  image?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  ticketType: string;
  hasPaid: boolean;
  paymentId?: string;
  registeredAt: string;
}

export interface EventAddonState {
  events: Event[];
  userRegistrations: EventRegistration[];
  isLoading: boolean;
}

export interface EventAddonActions {
  createEvent: (event: Omit<Event, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>) => Promise<Event>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<boolean>;
  registerForEvent: (eventId: string, user: User, isPaid: boolean) => Promise<EventRegistration>;
  cancelRegistration: (registrationId: string) => Promise<boolean>;
  getEventById: (id: string) => Event | undefined;
  getUserRegistrations: (userId: string) => EventRegistration[];
}
