
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ambulance } from "@/services";

interface AmbulancePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ambulance: Ambulance | null;
  onPaymentSuccess: () => void;
}

const AmbulancePaymentDialog: React.FC<AmbulancePaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  ambulance,
  onPaymentSuccess 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <span>${ambulance?.price}</span>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onPaymentSuccess}>Pay ${ambulance?.price}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AmbulancePaymentDialog;
