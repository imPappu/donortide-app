
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

interface AddConsultantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newConsultant: Omit<Consultant, 'id'>;
  setNewConsultant: React.Dispatch<React.SetStateAction<Omit<Consultant, 'id'>>>;
  onAdd: () => Promise<void>;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddConsultantDialog = ({ 
  isOpen, 
  onOpenChange, 
  newConsultant, 
  setNewConsultant, 
  onAdd 
}: AddConsultantDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Consultant</DialogTitle>
          <DialogDescription>
            Add a new consultant to the system. They will be immediately visible to users.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={newConsultant.name} 
              onChange={(e) => setNewConsultant({...newConsultant, name: e.target.value})}
              placeholder="Dr. John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input 
              id="specialty" 
              value={newConsultant.specialty} 
              onChange={(e) => setNewConsultant({...newConsultant, specialty: e.target.value})}
              placeholder="Hematology"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              value={newConsultant.phone} 
              onChange={(e) => setNewConsultant({...newConsultant, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <Label className="block mb-2">Available Days</Label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div className="flex items-center space-x-2" key={day}>
                  <Checkbox 
                    id={`day-${day}`} 
                    checked={newConsultant.availableDays?.includes(day)} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewConsultant({
                          ...newConsultant, 
                          availableDays: [...(newConsultant.availableDays || []), day]
                        });
                      } else {
                        setNewConsultant({
                          ...newConsultant, 
                          availableDays: (newConsultant.availableDays || []).filter(d => d !== day)
                        });
                      }
                    }}
                  />
                  <label htmlFor={`day-${day}`} className="text-sm">{day}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availableTimeStart">Available From</Label>
              <Input 
                id="availableTimeStart" 
                type="time"
                value={newConsultant.availableTimeStart || "09:00"} 
                onChange={(e) => setNewConsultant({...newConsultant, availableTimeStart: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availableTimeEnd">Available Until</Label>
              <Input 
                id="availableTimeEnd" 
                type="time"
                value={newConsultant.availableTimeEnd || "17:00"} 
                onChange={(e) => setNewConsultant({...newConsultant, availableTimeEnd: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="isFreeService" 
                checked={newConsultant.isFreeService} 
                onCheckedChange={(checked) => {
                  setNewConsultant({
                    ...newConsultant, 
                    isFreeService: checked,
                    price: checked ? undefined : newConsultant.price
                  });
                }}
              />
              <Label htmlFor="isFreeService">Free Service</Label>
            </div>
            
            {!newConsultant.isFreeService && (
              <div className="space-y-2">
                <Label htmlFor="price">Consultation Fee ($)</Label>
                <Input 
                  id="price" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={newConsultant.price || ""} 
                  onChange={(e) => setNewConsultant({
                    ...newConsultant, 
                    price: e.target.value === "" ? undefined : parseFloat(e.target.value)
                  })}
                  placeholder="100.00"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="status" 
              checked={newConsultant.status === "Available"} 
              onCheckedChange={(checked) => setNewConsultant({...newConsultant, status: checked ? "Available" : "Busy"})}
            />
            <Label htmlFor="status">Available for consultations</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAdd}>Add Consultant</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsultantDialog;
