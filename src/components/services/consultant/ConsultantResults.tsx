
import React from "react";
import { Consultant } from "@/services";
import ConsultantCard from "./ConsultantCard";
import ConsultantEmptyState from "./ConsultantEmptyState";

interface ConsultantResultsProps {
  consultants: Consultant[];
  onBookService: (consultant: Consultant) => void;
}

const ConsultantResults: React.FC<ConsultantResultsProps> = ({ 
  consultants, 
  onBookService 
}) => {
  if (consultants.length === 0) {
    return <ConsultantEmptyState />;
  }

  return (
    <div className="space-y-4">
      {consultants.map((consultant) => (
        <ConsultantCard 
          key={consultant.id} 
          consultant={consultant} 
          onBookService={onBookService} 
        />
      ))}
    </div>
  );
};

export default ConsultantResults;
