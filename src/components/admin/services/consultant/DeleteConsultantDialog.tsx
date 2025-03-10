
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
import { Consultant } from "@/services";

interface DeleteConsultantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  consultant: Consultant | null;
  onDelete: () => Promise<void>;
}

const DeleteConsultantDialog = ({ 
  isOpen, 
  onOpenChange, 
  consultant, 
  onDelete 
}: DeleteConsultantDialogProps) => {
  if (!consultant) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this consultant? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="mb-2"><strong>Name:</strong> {consultant.name}</p>
          <p className="mb-2"><strong>Specialty:</strong> {consultant.specialty}</p>
          <p><strong>Phone:</strong> {consultant.phone}</p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>Delete Consultant</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConsultantDialog;
