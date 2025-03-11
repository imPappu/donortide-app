
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
  // Create a grid template columns style to properly handle the cols prop
  const gridCols = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
  };

  return (
    <div 
      className={`grid gap-6 ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(1, minmax(0, 1fr))`,
        '@media (min-width: 768px)': gridCols
      }}
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
