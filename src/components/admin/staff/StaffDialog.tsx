
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StaffMember } from './types';
import AddStaffForm from './AddStaffForm';
import EditStaffForm from './EditStaffForm';
import DeleteStaffConfirmation from './DeleteStaffConfirmation';

interface StaffDialogProps {
  type: 'add' | 'edit' | 'delete';
  isOpen: boolean;
  onClose: () => void;
  newStaff?: Partial<StaffMember>;
  onNewStaffChange?: (staff: Partial<StaffMember>) => void;
  onAddStaff?: () => void;
  editingStaff?: StaffMember | null;
  onEditingStaffChange?: (staff: StaffMember) => void;
  onEditStaff?: () => void;
  onDeleteStaff?: () => void;
}

const StaffDialog: React.FC<StaffDialogProps> = ({
  type,
  isOpen,
  onClose,
  newStaff,
  onNewStaffChange,
  onAddStaff,
  editingStaff,
  onEditingStaffChange,
  onEditStaff,
  onDeleteStaff
}) => {
  const getTitle = () => {
    switch (type) {
      case 'add': return 'Add New Staff Member';
      case 'edit': return 'Edit Staff Member';
      case 'delete': return 'Confirm Deletion';
      default: return '';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'add': return 'Add a new staff member to the system. They will receive an email with login instructions.';
      case 'edit': return 'Update staff member information and permissions.';
      case 'delete': return '';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          {getDescription() && (
            <DialogDescription>{getDescription()}</DialogDescription>
          )}
        </DialogHeader>

        {type === 'add' && newStaff && onNewStaffChange && onAddStaff && (
          <AddStaffForm
            newStaff={newStaff}
            onStaffChange={onNewStaffChange}
            onCancel={onClose}
            onAdd={onAddStaff}
          />
        )}

        {type === 'edit' && editingStaff && onEditingStaffChange && onEditStaff && (
          <EditStaffForm
            staff={editingStaff}
            onStaffChange={onEditingStaffChange}
            onCancel={onClose}
            onSave={onEditStaff}
          />
        )}

        {type === 'delete' && editingStaff && onDeleteStaff && (
          <DeleteStaffConfirmation
            staff={editingStaff}
            onCancel={onClose}
            onConfirm={onDeleteStaff}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StaffDialog;
