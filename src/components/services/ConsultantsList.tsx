
import React from "react";
import { Consultant } from "@/services";
import ConsultantListSkeleton from "./consultant/ConsultantListSkeleton";
import ConsultantBookingHandler from "./consultant/ConsultantBookingHandler";
import ConsultantResults from "./consultant/ConsultantResults";

interface ConsultantsListProps {
  consultants: Consultant[];
  isLoading: boolean;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, isLoading }) => {
  if (isLoading) {
    return <ConsultantListSkeleton />;
  }

  return (
    <ConsultantBookingHandler>
      {(handleBookService) => (
        <ConsultantResults 
          consultants={consultants} 
          onBookService={handleBookService} 
        />
      )}
    </ConsultantBookingHandler>
  );
};

export default ConsultantsList;
