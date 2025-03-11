
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
  // Create grid column classes based on the cols prop
  const getGridColsClass = () => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div 
      className={`grid gap-6 ${getGridColsClass()} ${className}`}
    >
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
