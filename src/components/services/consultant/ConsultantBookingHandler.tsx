
import React, { useState } from "react";
import { Consultant } from "@/services";
import ConsultantPaymentDialog from "./ConsultantPaymentDialog";

interface ConsultantBookingHandlerProps {
  children: (handleBookService: (consultant: Consultant) => void) => React.ReactNode;
}

const ConsultantBookingHandler: React.FC<ConsultantBookingHandlerProps> = ({ children }) => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

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
    <>
      {children(handleBookService)}
      
      <ConsultantPaymentDialog 
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        consultant={selectedConsultant}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ConsultantBookingHandler;
