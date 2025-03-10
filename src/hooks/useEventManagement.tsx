
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Event, EventRegistration, EventAddonState, EventAddonActions } from '@/hooks/addon-modules/types/eventManagement';
import { User } from '@/types/auth';

// Local storage keys
const EVENTS_STORAGE_KEY = 'donortide_events';
const REGISTRATIONS_STORAGE_KEY = 'donortide_event_registrations';

export const useEventManagement = (): EventAddonState & EventAddonActions => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize from localStorage
  useEffect(() => {
    const loadEvents = () => {
      try {
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        }

        const savedRegistrations = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
        if (savedRegistrations) {
          setUserRegistrations(JSON.parse(savedRegistrations));
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error);
        toast({
          title: 'Error',
          description: 'Failed to load events data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [toast]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(userRegistrations));
    }
  }, [userRegistrations, isLoading]);

  const createEvent = async (eventData: Omit<Event, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const now = new Date().toISOString();
    const newEvent: Event = {
      id: uuidv4(),
      ...eventData,
      registrations: 0,
      createdAt: now,
      updatedAt: now,
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    
    toast({
      title: 'Success',
      description: 'Event created successfully',
    });

    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    let updatedEvent: Event | null = null;

    setEvents(prevEvents => {
      const newEvents = prevEvents.map(event => {
        if (event.id === id) {
          updatedEvent = {
            ...event,
            ...eventData,
            updatedAt: new Date().toISOString(),
          };
          return updatedEvent;
        }
        return event;
      });
      return newEvents;
    });

    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    toast({
      title: 'Success',
      description: 'Event updated successfully',
    });

    return updatedEvent;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    const eventExists = events.some(event => event.id === id);
    
    if (!eventExists) {
      toast({
        title: 'Error',
        description: 'Event not found',
        variant: 'destructive',
      });
      return false;
    }

    // Remove the event
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    
    // Remove all registrations for this event
    setUserRegistrations(prevRegs => prevRegs.filter(reg => reg.eventId !== id));

    toast({
      title: 'Success',
      description: 'Event deleted successfully',
    });

    return true;
  };

  const registerForEvent = async (eventId: string, user: User, isPaid: boolean): Promise<EventRegistration> => {
    // Find the event
    const event = events.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Check if user is already registered
    const alreadyRegistered = userRegistrations.some(
      reg => reg.eventId === eventId && reg.userId === user.id
    );

    if (alreadyRegistered) {
      throw new Error('You are already registered for this event');
    }

    // Check if event is at capacity
    if (event.registrations >= event.capacity) {
      throw new Error('This event is at capacity');
    }

    // Create registration
    const newRegistration: EventRegistration = {
      id: uuidv4(),
      eventId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      ticketType: event.isPaid ? 'Paid' : 'Free',
      hasPaid: !event.isPaid || isPaid, // If it's a free event, it's automatically "paid"
      registeredAt: new Date().toISOString(),
    };

    // Update registrations
    setUserRegistrations(prev => [...prev, newRegistration]);
    
    // Update event registration count
    setEvents(prevEvents => prevEvents.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          registrations: e.registrations + 1,
          updatedAt: new Date().toISOString(),
        };
      }
      return e;
    }));

    toast({
      title: 'Success',
      description: 'Successfully registered for event',
    });

    return newRegistration;
  };

  const cancelRegistration = async (registrationId: string): Promise<boolean> => {
    const registration = userRegistrations.find(reg => reg.id === registrationId);
    
    if (!registration) {
      throw new Error('Registration not found');
    }

    // Remove the registration
    setUserRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
    
    // Update event registration count
    setEvents(prevEvents => prevEvents.map(e => {
      if (e.id === registration.eventId) {
        return {
          ...e,
          registrations: Math.max(0, e.registrations - 1),
          updatedAt: new Date().toISOString(),
        };
      }
      return e;
    }));

    toast({
      title: 'Success',
      description: 'Registration canceled successfully',
    });

    return true;
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
    getUserRegistrations,
  };
};

export default useEventManagement;
