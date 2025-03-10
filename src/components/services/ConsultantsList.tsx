
import React, { useState } from "react";
import { Consultant } from "@/services";
import ConsultantCard from "./consultant/ConsultantCard";
import ConsultantListSkeleton from "./consultant/ConsultantListSkeleton";
import ConsultantEmptyState from "./consultant/ConsultantEmptyState";
import ConsultantPaymentDialog from "./consultant/ConsultantPaymentDialog";

interface ConsultantsListProps {
  consultants: Consultant[];
  isLoading: boolean;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, isLoading }) => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  if (isLoading) {
    return <ConsultantListSkeleton />;
  }

  const handleBookService = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    if (consultant.isFreeService) {
      // For free services, directly open communication options
      window.open(`tel:${consultant.phone}`);
    } else {
      // For paid services, open payment dialog
      setIsPaymentDialogOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentDialogOpen(false);
    // In a real app, you would process the payment and then
    // either redirect to a booking confirmation or initiate direct contact
    alert("Payment successful! You can now contact the consultant.");
  };

  return (
    <div className="space-y-4">
      {consultants.map((consultant) => (
        <ConsultantCard 
          key={consultant.id} 
          consultant={consultant} 
          onBookService={handleBookService} 
        />
      ))}
      
      {consultants.length === 0 && !isLoading && <ConsultantEmptyState />}
      
      <ConsultantPaymentDialog 
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        consultant={selectedConsultant}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default ConsultantsList;
