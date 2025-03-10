
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { StaffMember } from './types';

export const useStaffManagement = () => {
  const { toast } = useToast();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { 
      id: '1', 
      name: 'Admin User', 
      email: 'admin@example.com', 
      role: 'admin', 
      isActive: true, 
      lastLogin: '2023-05-15T10:30:00Z' 
    },
    { 
      id: '2', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'manager', 
      isActive: true, 
      lastLogin: '2023-05-14T09:15:00Z' 
    },
    { 
      id: '3', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'staff', 
      isActive: true, 
      lastLogin: '2023-05-13T14:22:00Z' 
    },
    { 
      id: '4', 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      role: 'editor', 
      isActive: true, 
      lastLogin: '2023-05-12T11:45:00Z' 
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    role: 'staff',
    isActive: true
  });
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'delete' | null>(null);

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    const newId = (staffMembers.length + 1).toString();
    const newStaffMember: StaffMember = {
      id: newId,
      name: newStaff.name || '',
      email: newStaff.email || '',
      role: newStaff.role || 'staff',
      isActive: newStaff.isActive !== undefined ? newStaff.isActive : true,
      lastLogin: 'Never'
    };

    setStaffMembers([...staffMembers, newStaffMember]);
    setNewStaff({
      name: '',
      email: '',
      role: 'staff',
      isActive: true
    });
    setDialogType(null);
    
    toast({
      title: "Staff Added",
      description: `${newStaffMember.name} has been added as ${newStaffMember.role}`,
    });
  };

  const handleEditStaff = () => {
    if (!editingStaff) return;
    
    setStaffMembers(staffMembers.map(staff => 
      staff.id === editingStaff.id ? editingStaff : staff
    ));
    setDialogType(null);
    
    toast({
      title: "Staff Updated",
      description: `${editingStaff.name}'s information has been updated`,
    });
  };

  const handleDeleteStaff = () => {
    if (!editingStaff) return;
    
    setStaffMembers(staffMembers.filter(staff => staff.id !== editingStaff.id));
    setDialogType(null);
    
    toast({
      title: "Staff Removed",
      description: `${editingStaff.name} has been removed from staff`,
    });
  };

  const openAddDialog = () => {
    setDialogType('add');
  };

  const openEditDialog = (staff: StaffMember) => {
    setEditingStaff(staff);
    setDialogType('edit');
  };

  const openDeleteDialog = (staff: StaffMember) => {
    setEditingStaff(staff);
    setDialogType('delete');
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return {
    staffMembers,
    filteredStaff,
    searchTerm,
    setSearchTerm,
    editingStaff,
    setEditingStaff,
    newStaff,
    setNewStaff,
    dialogType,
    handleAddStaff,
    handleEditStaff,
    handleDeleteStaff,
    openAddDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog
  };
};
