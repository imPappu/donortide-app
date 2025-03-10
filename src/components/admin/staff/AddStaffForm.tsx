
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { StaffMember, StaffRole } from './types';

interface AddStaffFormProps {
  newStaff: Partial<StaffMember>;
  onStaffChange: (staff: Partial<StaffMember>) => void;
  onCancel: () => void;
  onAdd: () => void;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({
  newStaff,
  onStaffChange,
  onCancel,
  onAdd
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={newStaff.name || ''}
          onChange={(e) => onStaffChange({ ...newStaff, name: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={newStaff.email || ''}
          onChange={(e) => onStaffChange({ ...newStaff, email: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={newStaff.role || 'staff'}
          onValueChange={(value) => onStaffChange({ ...newStaff, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={newStaff.isActive}
          onCheckedChange={(checked) => onStaffChange({ ...newStaff, isActive: checked })}
        />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onAdd}>Add Staff</Button>
      </div>
    </div>
  );
};

export default AddStaffForm;
