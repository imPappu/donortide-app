
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import StaffList from './staff/StaffList';
import StaffSearchBar from './staff/StaffSearchBar';
import StaffDialog from './staff/StaffDialog';
import { useStaffManagement } from './staff/useStaffManagement';

const StaffManagement = () => {
  const {
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
  } = useStaffManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <StaffSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>
      
      <StaffList 
        staffMembers={filteredStaff}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />
      
      <StaffDialog
        type={dialogType || 'add'}
        isOpen={dialogType !== null}
        onClose={closeDialog}
        newStaff={newStaff}
        onNewStaffChange={setNewStaff}
        onAddStaff={handleAddStaff}
        editingStaff={editingStaff}
        onEditingStaffChange={setEditingStaff}
        onEditStaff={handleEditStaff}
        onDeleteStaff={handleDeleteStaff}
      />
    </div>
  );
};

export default StaffManagement;
