
import { useState, useEffect } from "react";
import { useEventsService } from "./eventsService";
import { useCampaignsService } from "./campaignsService";
import { Event, Campaign, EventFormData, CampaignFormData } from "./types";
import { useToast } from "@/hooks/use-toast";

export const useEventsCampaignsAddon = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  
  const eventsService = useEventsService();
  const campaignsService = useCampaignsService();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [eventsData, campaignsData] = await Promise.all([
          eventsService.getEvents(),
          campaignsService.getCampaigns()
        ]);
        
        setEvents(eventsData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error fetching addon data:", error);
        toast({
          title: "Data Loading Error",
          description: "Could not load events and campaigns data. Using fallback data.",
          variant: "destructive",
        });
        
        // Use mock data as fallback
        setEvents(eventsService.mockEvents);
        setCampaigns(campaignsService.mockCampaigns);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Event CRUD operations
  const loadEvent = async (id: number) => {
    setIsLoading(true);
    const event = await eventsService.getEvent(id);
    setActiveEvent(event);
    setIsLoading(false);
    return event;
  };

  const createEvent = async (eventData: EventFormData) => {
    setIsLoading(true);
    const newEvent = await eventsService.createEvent(eventData);
    if (newEvent) {
      setEvents(prev => [...prev, newEvent]);
    }
    setIsLoading(false);
    return newEvent;
  };

  const updateEvent = async (id: number, eventData: Partial<EventFormData>) => {
    setIsLoading(true);
    const updatedEvent = await eventsService.updateEvent(id, eventData);
    if (updatedEvent) {
      setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
      if (activeEvent?.id === id) {
        setActiveEvent(updatedEvent);
      }
    }
    setIsLoading(false);
    return updatedEvent;
  };

  const deleteEvent = async (id: number) => {
    setIsLoading(true);
    const success = await eventsService.deleteEvent(id);
    if (success) {
      setEvents(prev => prev.filter(event => event.id !== id));
      if (activeEvent?.id === id) {
        setActiveEvent(null);
      }
    }
    setIsLoading(false);
    return success;
  };

  // Campaign CRUD operations
  const loadCampaign = async (id: number) => {
    setIsLoading(true);
    const campaign = await campaignsService.getCampaign(id);
    setActiveCampaign(campaign);
    setIsLoading(false);
    return campaign;
  };

  const createCampaign = async (campaignData: CampaignFormData) => {
    setIsLoading(true);
    const newCampaign = await campaignsService.createCampaign(campaignData);
    if (newCampaign) {
      setCampaigns(prev => [...prev, newCampaign]);
    }
    setIsLoading(false);
    return newCampaign;
  };

  const updateCampaign = async (id: number, campaignData: Partial<CampaignFormData>) => {
    setIsLoading(true);
    const updatedCampaign = await campaignsService.updateCampaign(id, campaignData);
    if (updatedCampaign) {
      setCampaigns(prev => prev.map(campaign => campaign.id === id ? updatedCampaign : campaign));
      if (activeCampaign?.id === id) {
        setActiveCampaign(updatedCampaign);
      }
    }
    setIsLoading(false);
    return updatedCampaign;
  };

  const deleteCampaign = async (id: number) => {
    setIsLoading(true);
    const success = await campaignsService.deleteCampaign(id);
    if (success) {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
      if (activeCampaign?.id === id) {
        setActiveCampaign(null);
      }
    }
    setIsLoading(false);
    return success;
  };

  // Utility functions
  const clearActiveItems = () => {
    setActiveEvent(null);
    setActiveCampaign(null);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, campaignsData] = await Promise.all([
        eventsService.getEvents(),
        campaignsService.getCampaigns()
      ]);
      
      setEvents(eventsData);
      setCampaigns(campaignsData);
      
      toast({
        title: "Data Refreshed",
        description: "Events and campaigns data has been refreshed.",
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast({
        title: "Refresh Failed",
        description: "Could not refresh events and campaigns data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isLoading,
    events,
    campaigns,
    activeEvent,
    activeCampaign,
    
    // Event operations
    loadEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    
    // Campaign operations
    loadCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    
    // Utilities
    clearActiveItems,
    refreshData
  };
};
