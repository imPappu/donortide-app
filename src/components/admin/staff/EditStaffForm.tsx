
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
import { StaffMember } from './types';

interface EditStaffFormProps {
  staff: StaffMember;
  onStaffChange: (staff: StaffMember) => void;
  onCancel: () => void;
  onSave: () => void;
}

const EditStaffForm: React.FC<EditStaffFormProps> = ({
  staff,
  onStaffChange,
  onCancel,
  onSave
}) => {
  if (!staff) return null;
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="edit-name">Name</Label>
        <Input
          id="edit-name"
          value={staff.name}
          onChange={(e) => onStaffChange({ ...staff, name: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="edit-email">Email</Label>
        <Input
          id="edit-email"
          type="email"
          value={staff.email}
          onChange={(e) => onStaffChange({ ...staff, email: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="edit-role">Role</Label>
        <Select
          value={staff.role}
          onValueChange={(value) => onStaffChange({ ...staff, role: value })}
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
          id="edit-active"
          checked={staff.isActive}
          onCheckedChange={(checked) => onStaffChange({ ...staff, isActive: checked })}
        />
        <Label htmlFor="edit-active">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditStaffForm;
