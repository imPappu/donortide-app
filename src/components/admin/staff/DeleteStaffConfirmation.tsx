
import React from 'react';
import { Button } from "@/components/ui/button";
import { StaffMember } from './types';

interface DeleteStaffConfirmationProps {
  staff: StaffMember | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteStaffConfirmation: React.FC<DeleteStaffConfirmationProps> = ({
  staff,
  onCancel,
  onConfirm
}) => {
  if (!staff) return null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete {staff.name}? This action cannot be undone.
      </p>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="destructive" onClick={onConfirm}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteStaffConfirmation;
