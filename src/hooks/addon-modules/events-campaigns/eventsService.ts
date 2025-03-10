
import { Event, EventFormData } from './types';
import { API_BASE_URL } from '@/services/apiConfig';
import { fetchWithRetry } from '@/services/dashboardService';
import { useToast } from '@/hooks/use-toast';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Blood Donation Drive',
    description: 'Join our community blood donation drive and help save lives.',
    startDate: '2023-11-10T09:00:00Z',
    endDate: '2023-11-10T17:00:00Z',
    location: 'City Hospital, Downtown',
    isPaid: false,
    status: 'completed',
    organizerId: 1,
    createdAt: '2023-10-20T14:00:00Z',
    updatedAt: '2023-10-25T11:30:00Z'
  },
  {
    id: 2,
    title: 'Blood Donation Awareness Workshop',
    description: 'Learn about the importance of blood donation and how it impacts lives.',
    startDate: '2023-12-05T14:00:00Z',
    endDate: '2023-12-05T16:00:00Z',
    location: 'Community Center',
    isPaid: true,
    price: 10.00,
    currency: 'USD',
    maxAttendees: 50,
    currentAttendees: 23,
    status: 'upcoming',
    imageUrl: 'https://placehold.co/600x400/red/white?text=Workshop',
    organizerId: 2,
    createdAt: '2023-11-01T09:45:00Z',
    updatedAt: '2023-11-05T16:20:00Z'
  },
  {
    id: 3,
    title: 'Blood Type Education Seminar',
    description: 'Understand different blood types and their compatibility for donation purposes.',
    startDate: '2024-01-15T10:00:00Z',
    endDate: '2024-01-15T12:30:00Z',
    location: 'Medical University Auditorium',
    isPaid: true,
    price: 15.00,
    currency: 'USD',
    maxAttendees: 100,
    currentAttendees: 45,
    status: 'upcoming',
    imageUrl: 'https://placehold.co/600x400/blue/white?text=Seminar',
    organizerId: 1,
    createdAt: '2023-12-01T11:20:00Z',
    updatedAt: '2023-12-10T14:15:00Z'
  }
];

export const useEventsService = () => {
  const { toast } = useToast();

  const getEvents = async (): Promise<Event[]> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/events`, {}, 2);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Using cached data",
        description: "Could not fetch fresh events data. Using cached data instead.",
        variant: "destructive",
      });
      return mockEvents;
    }
  };

  const getEvent = async (id: number): Promise<Event | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/events/${id}`, {}, 2);
      if (!response.ok) throw new Error('Failed to fetch event');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      const mockEvent = mockEvents.find(event => event.id === id);
      toast({
        title: "Using cached data",
        description: "Could not fetch fresh event data. Using cached data instead.",
        variant: "destructive",
      });
      return mockEvent || null;
    }
  };

  const createEvent = async (eventData: EventFormData): Promise<Event | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }, 2);
      if (!response.ok) throw new Error('Failed to create event');
      toast({
        title: "Event Created",
        description: "The event has been created successfully.",
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Failed to Create Event",
        description: "There was an error creating the event. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateEvent = async (id: number, eventData: Partial<EventFormData>): Promise<Event | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }, 2);
      if (!response.ok) throw new Error('Failed to update event');
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating event with id ${id}:`, error);
      toast({
        title: "Failed to Update Event",
        description: "There was an error updating the event. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteEvent = async (id: number): Promise<boolean> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      }, 2);
      if (!response.ok) throw new Error('Failed to delete event');
      toast({
        title: "Event Deleted",
        description: "The event has been deleted successfully.",
      });
      return true;
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      toast({
        title: "Failed to Delete Event",
        description: "There was an error deleting the event. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    mockEvents
  };
};
