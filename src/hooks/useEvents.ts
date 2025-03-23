
import { useState, useEffect } from 'react';
import { EventType } from '@/types/events';
import { useEventsService } from '@/hooks/addon-modules/events-campaigns/eventsService';
import { toast } from '@/hooks/use-toast';

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const eventsService = useEventsService();
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedEvents = await eventsService.getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      // Use mock data as fallback
      setEvents(eventsService.mockEvents);
      toast({
        title: "Using cached data",
        description: "Could not fetch fresh events data. Using cached data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const createEvent = async (eventData: any) => {
    setIsLoading(true);
    try {
      const createdEvent = await eventsService.createEvent(eventData);
      if (createdEvent) {
        setEvents([...events, createdEvent]);
        toast({
          title: "Event Created",
          description: "Your event has been created successfully.",
        });
        return createdEvent;
      }
    } catch (err) {
      console.error('Error creating event:', err);
      toast({
        title: "Error Creating Event",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    events,
    isLoading,
    error,
    fetchEvents,
    createEvent
  };
};
