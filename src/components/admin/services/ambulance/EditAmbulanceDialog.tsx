
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
import { Ambulance } from "@/services";

interface EditAmbulanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambulance: Ambulance | null;
  setAmbulance: React.Dispatch<React.SetStateAction<Ambulance | null>>;
  onUpdate: () => Promise<void>;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditAmbulanceDialog = ({ 
  isOpen, 
  onOpenChange, 
  ambulance, 
  setAmbulance, 
  onUpdate 
}: EditAmbulanceDialogProps) => {
  if (!ambulance) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Ambulance</DialogTitle>
          <DialogDescription>
            Update the ambulance information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-vehicleNumber">Vehicle Number</Label>
            <Input 
              id="edit-vehicleNumber" 
              value={ambulance.vehicleNumber} 
              onChange={(e) => setAmbulance({...ambulance, vehicleNumber: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-location">Location</Label>
            <Input 
              id="edit-location" 
              value={ambulance.location} 
              onChange={(e) => setAmbulance({...ambulance, location: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-driverName">Driver Name</Label>
            <Input 
              id="edit-driverName" 
              value={ambulance.driverName} 
              onChange={(e) => setAmbulance({...ambulance, driverName: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-driverPhone">Driver Phone</Label>
            <Input 
              id="edit-driverPhone" 
              value={ambulance.driverPhone} 
              onChange={(e) => setAmbulance({...ambulance, driverPhone: e.target.value})}
            />
          </div>
          
          <div>
            <Label className="block mb-2">Available Days</Label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <div className="flex items-center space-x-2" key={day}>
                  <Checkbox 
                    id={`edit-day-${day}`} 
                    checked={ambulance.availableDays?.includes(day)} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setAmbulance({
                          ...ambulance, 
                          availableDays: [...(ambulance.availableDays || []), day]
                        });
                      } else {
                        setAmbulance({
                          ...ambulance, 
                          availableDays: (ambulance.availableDays || []).filter(d => d !== day)
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
                value={ambulance.availableTimeStart || "09:00"} 
                onChange={(e) => setAmbulance({...ambulance, availableTimeStart: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-availableTimeEnd">Available Until</Label>
              <Input 
                id="edit-availableTimeEnd" 
                type="time"
                value={ambulance.availableTimeEnd || "17:00"} 
                onChange={(e) => setAmbulance({...ambulance, availableTimeEnd: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="edit-isFreeService" 
                checked={ambulance.isFreeService} 
                onCheckedChange={(checked) => {
                  setAmbulance({
                    ...ambulance, 
                    isFreeService: checked,
                    price: checked ? undefined : ambulance.price
                  });
                }}
              />
              <Label htmlFor="edit-isFreeService">Free Service</Label>
            </div>
            
            {!ambulance.isFreeService && (
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input 
                  id="edit-price" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={ambulance.price || ""} 
                  onChange={(e) => setAmbulance({
                    ...ambulance, 
                    price: e.target.value === "" ? undefined : parseFloat(e.target.value)
                  })}
                  placeholder="50.00"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="edit-status" 
              checked={ambulance.status === "Available"} 
              onCheckedChange={(checked) => setAmbulance({...ambulance, status: checked ? "Available" : "On Duty"})}
            />
            <Label htmlFor="edit-status">Available for service</Label>
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

export default EditAmbulanceDialog;
