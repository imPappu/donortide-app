
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Consultant } from "@/services";

interface EditConsultantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  consultant: Consultant | null;
  setConsultant: React.Dispatch<React.SetStateAction<Consultant | null>>;
  onUpdate: () => Promise<void>;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditConsultantDialog = ({ 
  isOpen, 
  onOpenChange, 
  consultant, 
  setConsultant, 
  onUpdate 
}: EditConsultantDialogProps) => {
  if (!consultant) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Consultant</DialogTitle>
          <DialogDescription>
            Update the consultant's information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input 
              id="edit-name" 
              value={consultant.name} 
              onChange={(e) => setConsultant({...consultant, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-specialty">Specialty</Label>
            <Input 
              id="edit-specialty" 
              value={consultant.specialty} 
              onChange={(e) => setConsultant({...consultant, specialty: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input 
              id="edit-phone" 
              value={consultant.phone} 
              onChange={(e) => setConsultant({...consultant, phone: e.target.value})}
            />
          </div>
          
          <div>
            <Label className="block mb-2">Available Days</Label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div className="flex items-center space-x-2" key={day}>
                  <Checkbox 
                    id={`edit-day-${day}`} 
                    checked={consultant.availableDays?.includes(day)} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setConsultant({
                          ...consultant, 
                          availableDays: [...(consultant.availableDays || []), day]
                        });
                      } else {
                        setConsultant({
                          ...consultant, 
                          availableDays: (consultant.availableDays || []).filter(d => d !== day)
                        });
                      }
                    }}
                  />
                  <label htmlFor={`edit-day-${day}`} className="text-sm">{day}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-availableTimeStart">Available From</Label>
              <Input 
                id="edit-availableTimeStart" 
                type="time"
                value={consultant.availableTimeStart || "09:00"} 
                onChange={(e) => setConsultant({...consultant, availableTimeStart: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-availableTimeEnd">Available Until</Label>
              <Input 
                id="edit-availableTimeEnd" 
                type="time"
                value={consultant.availableTimeEnd || "17:00"} 
                onChange={(e) => setConsultant({...consultant, availableTimeEnd: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="edit-isFreeService" 
                checked={consultant.isFreeService} 
                onCheckedChange={(checked) => {
                  setConsultant({
                    ...consultant, 
                    isFreeService: checked,
                    price: checked ? undefined : consultant.price
                  });
                }}
              />
              <Label htmlFor="edit-isFreeService">Free Service</Label>
            </div>
            
            {!consultant.isFreeService && (
              <div className="space-y-2">
                <Label htmlFor="edit-price">Consultation Fee ($)</Label>
                <Input 
                  id="edit-price" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={consultant.price || ""} 
                  onChange={(e) => setConsultant({
                    ...consultant, 
                    price: e.target.value === "" ? undefined : parseFloat(e.target.value)
                  })}
                  placeholder="100.00"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="edit-status" 
              checked={consultant.status === "Available"} 
              onCheckedChange={(checked) => setConsultant({...consultant, status: checked ? "Available" : "Busy"})}
            />
            <Label htmlFor="edit-status">Available for consultations</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditConsultantDialog;
