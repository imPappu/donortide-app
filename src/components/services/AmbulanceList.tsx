
import React, { useState } from "react";
import { Ambulance } from "@/services";
import AmbulanceCard from "./ambulance/AmbulanceCard";
import AmbulanceListSkeleton from "./ambulance/AmbulanceListSkeleton";
import AmbulanceEmptyState from "./ambulance/AmbulanceEmptyState";
import AmbulancePaymentDialog from "./ambulance/AmbulancePaymentDialog";

interface AmbulanceListProps {
  ambulances: Ambulance[];
  isLoading: boolean;
}

const AmbulanceList: React.FC<AmbulanceListProps> = ({ ambulances, isLoading }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  if (isLoading) {
    return <AmbulanceListSkeleton />;
  }

  const handleBookAmbulance = (ambulance: Ambulance) => {
    setSelectedAmbulance(ambulance);
    if (ambulance.isFreeService) {
      // For free services, directly open communication options
      window.open(`tel:${ambulance.driverPhone}`);
    } else {
      // For paid services, open payment dialog
      setIsPaymentDialogOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentDialogOpen(false);
    // In a real app, you would process the payment and then
    // either redirect to a booking confirmation or initiate direct contact
    alert("Payment successful! Your ambulance has been booked.");
  };

  return (
    <div className="space-y-4">
      {ambulances.map((ambulance) => (
        <AmbulanceCard 
          key={ambulance.id} 
          ambulance={ambulance} 
          onBookAmbulance={handleBookAmbulance} 
        />
      ))}
      
      {ambulances.length === 0 && !isLoading && <AmbulanceEmptyState />}
      
      <AmbulancePaymentDialog 
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        ambulance={selectedAmbulance}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default AmbulanceList;
