
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

interface EditConsultantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  consultant: Consultant | null;
  setConsultant: React.Dispatch<React.SetStateAction<Consultant | null>>;
  onUpdate: () => Promise<void>;
}

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
      <DialogContent>
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
