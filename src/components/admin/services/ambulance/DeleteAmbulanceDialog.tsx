
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Ambulance } from "@/services";

interface DeleteAmbulanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambulance: Ambulance | null;
  onDelete: () => Promise<void>;
}

const DeleteAmbulanceDialog = ({ 
  isOpen, 
  onOpenChange, 
  ambulance, 
  onDelete 
}: DeleteAmbulanceDialogProps) => {
  if (!ambulance) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this ambulance? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="mb-2"><strong>Vehicle Number:</strong> {ambulance.vehicleNumber}</p>
          <p className="mb-2"><strong>Location:</strong> {ambulance.location}</p>
          <p className="mb-2"><strong>Driver:</strong> {ambulance.driverName}</p>
          <p><strong>Phone:</strong> {ambulance.driverPhone}</p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>Delete Ambulance</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAmbulanceDialog;
