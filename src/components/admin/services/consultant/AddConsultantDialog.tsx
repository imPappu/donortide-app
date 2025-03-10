
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
import { Consultant } from "@/services";

interface AddConsultantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newConsultant: Omit<Consultant, 'id'>;
  setNewConsultant: React.Dispatch<React.SetStateAction<Omit<Consultant, 'id'>>>;
  onAdd: () => Promise<void>;
}

const AddConsultantDialog = ({ 
  isOpen, 
  onOpenChange, 
  newConsultant, 
  setNewConsultant, 
  onAdd 
}: AddConsultantDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
