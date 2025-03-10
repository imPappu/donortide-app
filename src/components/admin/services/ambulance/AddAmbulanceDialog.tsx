
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Ambulance } from "@/services";

interface AddAmbulanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newAmbulance: Omit<Ambulance, 'id'>;
  setNewAmbulance: React.Dispatch<React.SetStateAction<Omit<Ambulance, 'id'>>>;
  onAdd: () => Promise<void>;
}

const AddAmbulanceDialog = ({ 
  isOpen, 
  onOpenChange, 
  newAmbulance, 
  setNewAmbulance, 
  onAdd 
}: AddAmbulanceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ambulance</DialogTitle>
          <DialogDescription>
            Add a new ambulance to the system. It will be immediately available for users.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input 
              id="vehicleNumber" 
              value={newAmbulance.vehicleNumber} 
              onChange={(e) => setNewAmbulance({...newAmbulance, vehicleNumber: e.target.value})}
              placeholder="AMB-001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={newAmbulance.location} 
              onChange={(e) => setNewAmbulance({...newAmbulance, location: e.target.value})}
              placeholder="Downtown Medical Center"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="driverName">Driver Name</Label>
            <Input 
              id="driverName" 
              value={newAmbulance.driverName} 
              onChange={(e) => setNewAmbulance({...newAmbulance, driverName: e.target.value})}
              placeholder="John Smith"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="driverPhone">Driver Phone</Label>
            <Input 
              id="driverPhone" 
              value={newAmbulance.driverPhone} 
              onChange={(e) => setNewAmbulance({...newAmbulance, driverPhone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="status" 
              checked={newAmbulance.status === "Available"} 
              onCheckedChange={(checked) => setNewAmbulance({...newAmbulance, status: checked ? "Available" : "On Duty"})}
            />
            <Label htmlFor="status">Available for service</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAdd}>Add Ambulance</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmbulanceDialog;
