
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { StaffMember } from './types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchStaffMembers, 
  addStaffMember, 
  updateStaffMember, 
  deleteStaffMember 
} from '@/services/staffService';

export const useStaffManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Local state for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    role: 'staff',
    isActive: true
  });
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'delete' | null>(null);

  // Fetch staff members with react-query
  const { data: staffMembers = [] } = useQuery({
    queryKey: ['staffMembers'],
    queryFn: fetchStaffMembers
  });

  // Filter staff members based on search term
  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add staff mutation
  const addStaffMutation = useMutation({
    mutationFn: (staffData: Omit<StaffMember, 'id' | 'lastLogin'>) => 
      addStaffMember(staffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffMembers'] });
      setNewStaff({
        name: '',
        email: '',
        role: 'staff',
        isActive: true
      });
      setDialogType(null);
      
      toast({
        title: "Staff Added",
        description: `New staff member has been added successfully`,
      });
    },
    onError: (error) => {
      console.error('Error adding staff:', error);
      toast({
        title: "Error",
        description: "Failed to add staff member",
        variant: "destructive",
      });
    }
  });

  // Update staff mutation
  const updateStaffMutation = useMutation({
    mutationFn: (staffData: StaffMember) => updateStaffMember(staffData),
    onSuccess: (updatedStaff) => {
      queryClient.invalidateQueries({ queryKey: ['staffMembers'] });
      setDialogType(null);
      
      toast({
        title: "Staff Updated",
        description: `${updatedStaff.name}'s information has been updated`,
      });
    },
    onError: (error) => {
      console.error('Error updating staff:', error);
      toast({
        title: "Error",
        description: "Failed to update staff member",
        variant: "destructive",
      });
    }
  });

  // Delete staff mutation
  const deleteStaffMutation = useMutation({
    mutationFn: (id: string) => deleteStaffMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffMembers'] });
      setDialogType(null);
      
      if (editingStaff) {
        toast({
          title: "Staff Removed",
          description: `${editingStaff.name} has been removed from staff`,
        });
      }
    },
    onError: (error) => {
      console.error('Error deleting staff:', error);
      toast({
        title: "Error",
        description: "Failed to delete staff member",
        variant: "destructive",
      });
    }
  });

  // Handler functions
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    addStaffMutation.mutate({
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role as string,
      isActive: newStaff.isActive !== undefined ? newStaff.isActive : true
    });
  };

  const handleEditStaff = () => {
    if (!editingStaff) return;
    
    updateStaffMutation.mutate(editingStaff);
  };

  const handleDeleteStaff = () => {
    if (!editingStaff) return;
    
    deleteStaffMutation.mutate(editingStaff.id);
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
    closeDialog,
    isLoading: addStaffMutation.isPending || updateStaffMutation.isPending || deleteStaffMutation.isPending
  };
};
