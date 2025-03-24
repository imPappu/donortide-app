
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '@/components/TopNavbar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import EventGrid from '@/components/events/EventGrid';
import { useEventsService } from '@/hooks/addon-modules/events-campaigns/eventsService';

const EventsPage = () => {
  const navigate = useNavigate();
  const { mockEvents: events } = useEventsService();
  
  const handleCreateEvent = () => {
    navigate('/events/create');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Events" />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Upcoming Events</h1>
          </div>
          
          <Button onClick={handleCreateEvent}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
        
        <EventGrid>
          {events.map((event) => (
            <EventCard 
              key={event.id}
              title={event.title}
              description={event.description}
              date={new Date(event.startDate)}
              location={event.location}
              imageUrl={event.imageUrl}
              isPaid={event.isPaid}
              price={event.price}
              currency={event.currency}
              attendeesCount={event.currentAttendees}
              maxAttendees={event.maxAttendees}
              status={event.status}
              onClick={() => {}}
            />
          ))}
        </EventGrid>
      </div>
      
      <Navigation />
    </div>
  );
};

export default EventsPage;
