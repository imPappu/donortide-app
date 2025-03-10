
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, User, Calendar, Clock, MessageSquare, DollarSign } from "lucide-react";
import { Consultant } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ConsultantsListProps {
  consultants: Consultant[];
  isLoading: boolean;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, isLoading }) => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
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

  const handleBookService = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    if (consultant.isFreeService) {
      // For free services, directly open communication options
      // In a real app, you might redirect to a booking form
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
        <Card key={consultant.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border border-gray-200">
                  {consultant.imageUrl ? (
                    <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {consultant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{consultant.name}</h3>
                    <Badge variant={consultant.status === "Available" ? "success" : "outline"}>
                      {consultant.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
                  
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="mr-3">{formatAvailableDays(consultant.availableDays || [])}</span>
                    <Clock className="h-3 w-3 mr-1 ml-2" />
                    <span>{consultant.availableTimeStart || "09:00"} - {consultant.availableTimeEnd || "17:00"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0 md:ml-auto">
                <div className="flex items-center">
                  {consultant.isFreeService ? (
                    <Badge variant="outline" className="bg-green-50">Free Service</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50">
                      <DollarSign className="h-3 w-3 mr-1" />
                      ${consultant.price}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href={`https://wa.me/${consultant.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </a>
                  
                  <a 
                    href={`tel:${consultant.phone}`} 
                    className="text-primary hover:text-primary/80"
                  >
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </a>
                  
                  <Button
                    size="sm"
                    onClick={() => handleBookService(consultant)}
                    disabled={consultant.status !== "Available"}
                  >
                    Book {!consultant.isFreeService && `$${consultant.price}`}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {consultants.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No consultants available at the moment</p>
        </div>
      )}
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Pay for your consultation with {selectedConsultant?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Consultation Fee:</span>
              <span>${selectedConsultant?.price}</span>
            </div>
            
            <div className="border-t pt-3">
              <p className="font-medium">Payment Details</p>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your payment information below
              </p>
              
              {/* Mock payment form - in a real app, you would integrate with a payment processor */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePaymentSuccess}>Pay ${selectedConsultant?.price}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">{children}</label>
);

export default ConsultantsList;
