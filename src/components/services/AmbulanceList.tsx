
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ambulance as AmbulanceIcon, MapPin, Phone, User, Calendar, Clock, WhatsApp, DollarSign } from "lucide-react";
import { Ambulance } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AmbulanceListProps {
  ambulances: Ambulance[];
  isLoading: boolean;
}

const AmbulanceList: React.FC<AmbulanceListProps> = ({ ambulances, isLoading }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-3 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatAvailableDays = (days: string[]) => {
    if (days.length === 7) return "Every day";
    if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) 
      return "Weekdays";
    if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) 
      return "Weekends";
    return days.join(", ");
  };

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
        <Card key={ambulance.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{ambulance.vehicleNumber}</h3>
                <Badge variant={ambulance.status === "Available" ? "success" : "destructive"}>
                  {ambulance.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground flex items-center mb-1">
                <MapPin className="h-3 w-3 mr-1" />
                {ambulance.location}
              </p>
              
              <p className="text-sm text-muted-foreground flex items-center mb-2">
                <User className="h-3 w-3 mr-1" />
                {ambulance.driverName}
              </p>
              
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="mr-3">{formatAvailableDays(ambulance.availableDays || [])}</span>
                <Clock className="h-3 w-3 mr-1 ml-2" />
                <span>{ambulance.availableTimeStart || "09:00"} - {ambulance.availableTimeEnd || "17:00"}</span>
              </div>
              
              <div className="flex items-center mt-3 mb-2">
                {ambulance.isFreeService ? (
                  <Badge variant="outline" className="bg-green-50">Free Service</Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-50">
                    <DollarSign className="h-3 w-3 mr-1" />
                    ${ambulance.price}
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <a 
                    href={`https://wa.me/${ambulance.driverPhone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <WhatsApp className="h-4 w-4" />
                    </Button>
                  </a>
                  
                  <a 
                    href={`tel:${ambulance.driverPhone}`} 
                    className="text-primary hover:text-primary/80"
                  >
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                
                {ambulance.status === "Available" && (
                  <Button 
                    size="sm" 
                    onClick={() => handleBookAmbulance(ambulance)}
                  >
                    Book {!ambulance.isFreeService && `$${ambulance.price}`}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {ambulances.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <AmbulanceIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No ambulances available at the moment</p>
        </div>
      )}
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Pay for your ambulance service
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Service Fee:</span>
              <span>${selectedAmbulance?.price}</span>
            </div>
            
            <div className="border-t pt-3">
              <p className="font-medium">Payment Details</p>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your payment information below
              </p>
              
              {/* Mock payment form - in a real app, you would integrate with a payment processor */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium mb-1">Card Number</label>
                  <Input id="card-number" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePaymentSuccess}>Pay ${selectedAmbulance?.price}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AmbulanceList;
