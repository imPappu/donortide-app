
import React from "react";
import EventCard, { EventCardProps } from "./EventCard";

interface EventGridProps {
  events: EventCardProps[];
  className?: string;
  cols?: number;
  compact?: boolean;
}

const EventGrid = ({ 
  events, 
  className = "", 
  cols = 2,
  compact = false 
}: EventGridProps) => {
  return (
    <div className={`grid md:grid-cols-${cols} gap-6 ${className}`}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          time={event.time}
          location={event.location}
          organizer={event.organizer}
          description={compact ? event.description.substring(0, 80) + "..." : event.description}
          image={event.image}
        />
      ))}
    </div>
  );
};

export default EventGrid;
