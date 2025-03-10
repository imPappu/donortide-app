
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Event, EventRegistration, EventAddonState, EventAddonActions } from './addon-modules/types/eventManagement';

// Mock data for initial testing
const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Blood Donation Drive',
    description: 'Join our community blood donation event and help save lives.',
    date: '2023-12-15',
    time: '10:00 AM',
    location: 'Community Center, Downtown',
    isPaid: false,
    capacity: 50,
    registrations: 12,
    organizer: 'DonorTide Foundation',
    image: '/placeholder.svg',
    tags: ['donation', 'community', 'health'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Fundraising Gala',
    description: 'Annual fundraising gala for blood donation awareness and equipment funding.',
    date: '2023-12-20',
    time: '7:00 PM',
    location: 'Grand Hotel Ballroom',
    isPaid: true,
    price: 75,
    currency: 'USD',
    capacity: 200,
    registrations: 85,
    organizer: 'DonorTide Foundation',
    image: '/placeholder.svg',
    tags: ['fundraising', 'gala', 'charity'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useEventManagement(): EventAddonState & EventAddonActions {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [userRegistrations, setUserRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // In a real app, we would fetch from an API
      // For now, load from localStorage if available
      const savedEvents = localStorage.getItem('event_management_events');
      const savedRegistrations = localStorage.getItem('event_management_registrations');
      
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
      
      if (savedRegistrations) {
        setUserRegistrations(JSON.parse(savedRegistrations));
      }
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('event_management_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('event_management_registrations', JSON.stringify(userRegistrations));
  }, [userRegistrations]);

  const createEvent = async (eventData: Omit<Event, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newEvent: Event = {
        ...eventData,
        id: uuidv4(),
        registrations: 0,
        createdAt: now,
        updatedAt: now
      };
      
      setEvents(prev => [...prev, newEvent]);
      
      toast({
        title: "Event Created",
        description: `${newEvent.title} has been created successfully.`,
      });
      
      return newEvent;
    } catch (error) {
      toast({
        title: "Error Creating Event",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let updatedEvent: Event | undefined;
      
      setEvents(prev => prev.map(event => {
        if (event.id === id) {
          updatedEvent = {
            ...event,
            ...eventData,
            updatedAt: new Date().toISOString()
          };
          return updatedEvent;
        }
        return event;
      }));
      
      if (!updatedEvent) {
        throw new Error("Event not found");
      }
      
      toast({
        title: "Event Updated",
        description: `${updatedEvent.title} has been updated successfully.`,
      });
      
      return updatedEvent;
    } catch (error) {
      toast({
        title: "Error Updating Event",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventToDelete = events.find(event => event.id === id);
      if (!eventToDelete) {
        throw new Error("Event not found");
      }
      
      setEvents(prev => prev.filter(event => event.id !== id));
      
      // Also remove all registrations for this event
      setUserRegistrations(prev => prev.filter(reg => reg.eventId !== id));
      
      toast({
        title: "Event Deleted",
        description: `${eventToDelete.title} has been deleted successfully.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error Deleting Event",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerForEvent = async (eventId: string, user: User, isPaid: boolean): Promise<EventRegistration> => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to register for events.",
        variant: "destructive",
      });
      throw new Error("Authentication required");
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      
      // Check if event has capacity
      if (event.registrations >= event.capacity) {
        throw new Error("Event is at full capacity");
      }
      
      // Check if user is already registered
      const existingRegistration = userRegistrations.find(
        reg => reg.eventId === eventId && reg.userId === user.id
      );
      
      if (existingRegistration) {
        throw new Error("You are already registered for this event");
      }
      
      // Create new registration
      const newRegistration: EventRegistration = {
        id: uuidv4(),
        eventId,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        ticketType: event.isPaid ? 'Paid' : 'Free',
        hasPaid: !event.isPaid || isPaid, // Free events are automatically paid, paid events need confirmation
        registeredAt: new Date().toISOString()
      };
      
      setUserRegistrations(prev => [...prev, newRegistration]);
      
      // Update event registrations count
      setEvents(prev => prev.map(e => {
        if (e.id === eventId) {
          return {
            ...e,
            registrations: e.registrations + 1,
            updatedAt: new Date().toISOString()
          };
        }
        return e;
      }));
      
      toast({
        title: "Registration Successful",
        description: `You have been registered for ${event.title}.`,
      });
      
      return newRegistration;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to register for event";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRegistration = async (registrationId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const registration = userRegistrations.find(reg => reg.id === registrationId);
      if (!registration) {
        throw new Error("Registration not found");
      }
      
      // Remove registration
      setUserRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
      
      // Decrease event registration count
      setEvents(prev => prev.map(event => {
        if (event.id === registration.eventId) {
          return {
            ...event,
            registrations: Math.max(0, event.registrations - 1),
            updatedAt: new Date().toISOString()
          };
        }
        return event;
      }));
      
      toast({
        title: "Registration Cancelled",
        description: "Your registration has been cancelled successfully.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel registration. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getUserRegistrations = (userId: string): EventRegistration[] => {
    return userRegistrations.filter(reg => reg.userId === userId);
  };

  return {
    events,
    userRegistrations,
    isLoading,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    getEventById,
    getUserRegistrations
  };
}
