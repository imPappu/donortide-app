
import React, { ReactNode } from "react";

interface EventGridProps {
  children: ReactNode;
  className?: string;
}

const EventGrid: React.FC<EventGridProps> = ({ children, className = "" }) => {
  return (
    <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
};

export default EventGrid;
