
import React, { useState } from "react";
import { useEventManagement } from "@/hooks/useEventManagement";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Tag,
  Clock,
  MapPin,
  BadgeDollarSign,
  Ticket
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/hooks/addon-modules/types/eventManagement";
import EventDialog from "./EventDialog";
import EventRegistrationsDialog from "./EventRegistrationsDialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const EventsManagement = () => {
  const { 
    events, 
    userRegistrations,
    isLoading, 
    createEvent, 
    updateEvent, 
    deleteEvent,
    getUserRegistrations
  } = useEventManagement();
  const { user, isAuthenticated } = useAuth();
  
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showRegistrationsDialog, setShowRegistrationsDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const isAdmin = isAuthenticated && user?.role === "admin";
  
  const handleAddEvent = () => {
    setCurrentEvent(null);
    setShowEventDialog(true);
  };
  
  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setShowEventDialog(true);
  };
  
  const handleViewRegistrations = (event: Event) => {
    setCurrentEvent(event);
    setShowRegistrationsDialog(true);
  };
  
  const handleDeleteEvent = async (event: Event) => {
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
      try {
        await deleteEvent(event.id);
      } catch (error) {
        // Error is already handled in the hook with toast
      }
    }
  };
  
  const handleSaveEvent = async (eventData: any) => {
    try {
      if (currentEvent) {
        await updateEvent(currentEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      setShowEventDialog(false);
    } catch (error) {
      // Error is already handled in the hook with toast
    }
  };
  
  // Filter events based on the active tab
  const currentDate = new Date();
  
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    
    if (activeTab === "upcoming") {
      return eventDate >= currentDate;
    } else if (activeTab === "past") {
      return eventDate < currentDate;
    }
    
    return true; // "all" tab
  });
  
  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (activeTab === "past") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-muted-foreground">
            Manage events and track registrations
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={handleAddEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : sortedEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No events found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {activeTab === "upcoming" ? "There are no upcoming events scheduled." :
                   activeTab === "past" ? "There are no past events to display." :
                   "There are no events in the system."}
                </p>
                
                {isAdmin && (
                  <Button onClick={handleAddEvent} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            sortedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                isAdmin={isAdmin}
                onEdit={() => handleEditEvent(event)}
                onDelete={() => handleDeleteEvent(event)}
                onViewRegistrations={() => handleViewRegistrations(event)}
                userRegistrations={userRegistrations}
                userId={user?.id}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
      
      {showEventDialog && (
        <EventDialog
          isOpen={showEventDialog}
          onClose={() => setShowEventDialog(false)}
          onSave={handleSaveEvent}
          event={currentEvent}
          title={currentEvent ? "Edit Event" : "Add New Event"}
        />
      )}
      
      {showRegistrationsDialog && currentEvent && (
        <EventRegistrationsDialog
          isOpen={showRegistrationsDialog}
          onClose={() => setShowRegistrationsDialog(false)}
          event={currentEvent}
        />
      )}
    </div>
  );
};

interface EventCardProps {
  event: Event;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onViewRegistrations: () => void;
  userRegistrations: any[];
  userId?: string;
}

const EventCard = ({ 
  event, 
  isAdmin, 
  onEdit, 
  onDelete, 
  onViewRegistrations,
  userRegistrations,
  userId
}: EventCardProps) => {
  const { registerForEvent } = useEventManagement();
  const { isAuthenticated, user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  const isUserRegistered = userId && userRegistrations.some(
    reg => reg.eventId === event.id && reg.userId === userId
  );
  const isFullyBooked = event.registrations >= event.capacity;
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleRegister = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for this event.",
        variant: "destructive",
      });
      return;
    }
    
    if (isFullyBooked) {
      toast({
        title: "Event Fully Booked",
        description: "This event has reached its maximum capacity.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsRegistering(true);
      
      if (event.isPaid) {
        // For paid events, we would normally redirect to a payment page
        // For this demo, we'll just show a toast and register the user directly
        toast({
          title: "Payment Required",
          description: `This is a paid event. The price is ${event.price} ${event.currency}.`,
        });
        
        // Simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 1000));
        await registerForEvent(event.id, user, true);
      } else {
        // For free events, register directly
        await registerForEvent(event.id, user, true);
      }
    } catch (error) {
      // Error already handled in the hook
    } finally {
      setIsRegistering(false);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="bg-muted w-full md:w-40 h-40 md:h-auto flex items-center justify-center">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <Calendar className="h-16 w-16 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{event.title}</h3>
                {event.isPaid && (
                  <Badge variant="secondary" className="ml-2">
                    <BadgeDollarSign className="h-3 w-3 mr-1" />
                    Paid
                  </Badge>
                )}
                {isPastEvent && (
                  <Badge variant="outline" className="ml-2">Past Event</Badge>
                )}
              </div>
              
              <p className="text-muted-foreground">{event.description}</p>
              
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </div>
              
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-right">
                <div className="flex items-center justify-end">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {event.registrations}/{event.capacity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">registered</p>
              </div>
              
              {event.isPaid && (
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    {event.price} {event.currency}
                  </p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Organized by: <span className="font-medium">{event.organizer}</span>
            </div>
            
            <div className="flex gap-2">
              {isAdmin && (
                <>
                  <Button size="sm" variant="outline" onClick={onViewRegistrations}>
                    <Users className="h-4 w-4 mr-2" />
                    Registrations
                  </Button>
                  <Button size="sm" variant="outline" onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={onDelete} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
              
              {!isPastEvent && !isAdmin && (
                isUserRegistered ? (
                  <Button size="sm" variant="outline" disabled>
                    <Ticket className="h-4 w-4 mr-2" />
                    Registered
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={handleRegister}
                    disabled={isRegistering || isFullyBooked}
                  >
                    {isRegistering ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Ticket className="h-4 w-4 mr-2" />
                        {isFullyBooked ? "Fully Booked" : event.isPaid ? "Buy Ticket" : "Register"}
                      </>
                    )}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventsManagement;
