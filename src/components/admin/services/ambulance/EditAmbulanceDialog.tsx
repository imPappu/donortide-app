
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

interface EditAmbulanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambulance: Ambulance | null;
  setAmbulance: React.Dispatch<React.SetStateAction<Ambulance | null>>;
  onUpdate: () => Promise<void>;
}

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
      <DialogContent>
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
