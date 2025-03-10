
import React, { useState } from "react";
import { Consultant } from "@/services";
import ConsultantSearch from "./consultant/ConsultantSearch";
import ConsultantTable from "./consultant/ConsultantTable";
import ConsultantSkeleton from "./consultant/ConsultantSkeleton";
import AddConsultantDialog from "./consultant/AddConsultantDialog";
import EditConsultantDialog from "./consultant/EditConsultantDialog";
import DeleteConsultantDialog from "./consultant/DeleteConsultantDialog";

interface ConsultantManagementProps {
  consultants: Consultant[];
  isLoading: boolean;
  onAdd: (consultant: Omit<Consultant, 'id'>) => Promise<void>;
  onUpdate: (consultant: Consultant) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ConsultantManagement = ({ 
  consultants, 
  isLoading, 
  onAdd, 
  onUpdate, 
  onDelete 
}: ConsultantManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState<Consultant | null>(null);
  const [newConsultant, setNewConsultant] = useState<Omit<Consultant, 'id'>>({
    name: "",
    specialty: "",
    status: "Available",
    phone: ""
  });

  // Reset new consultant form
  const resetNewConsultantForm = () => {
    setNewConsultant({
      name: "",
      specialty: "",
      status: "Available",
      phone: ""
    });
  };

  // Open edit dialog
  const handleOpenEditDialog = (consultant: Consultant) => {
    setCurrentConsultant(consultant);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (consultant: Consultant) => {
    setCurrentConsultant(consultant);
    setIsDeleteDialogOpen(true);
  };

  // Handle add consultant
  const handleAddConsultant = async () => {
    await onAdd(newConsultant);
    setIsAddDialogOpen(false);
    resetNewConsultantForm();
  };

  // Handle update consultant
  const handleUpdateConsultant = async () => {
    if (currentConsultant) {
      await onUpdate(currentConsultant);
      setIsEditDialogOpen(false);
      setCurrentConsultant(null);
    }
  };

  // Handle delete consultant
  const handleDeleteConsultant = async () => {
    if (currentConsultant) {
      await onDelete(currentConsultant.id);
      setIsDeleteDialogOpen(false);
      setCurrentConsultant(null);
    }
  };

  // Toggle consultant status
  const toggleConsultantStatus = (id: number) => {
    const consultant = consultants.find(c => c.id === id);
    if (consultant) {
      const newStatus = consultant.status === "Available" ? "Busy" : "Available";
      onUpdate({ ...consultant, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <ConsultantSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setIsAddDialogOpen(true)}
      />
      
      {isLoading ? (
        <ConsultantSkeleton />
      ) : (
        <ConsultantTable 
          consultants={consultants}
          searchTerm={searchTerm}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
          onToggleStatus={toggleConsultantStatus}
        />
      )}
      
      <AddConsultantDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newConsultant={newConsultant}
        setNewConsultant={setNewConsultant}
        onAdd={handleAddConsultant}
      />
      
      <EditConsultantDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        consultant={currentConsultant}
        setConsultant={setCurrentConsultant}
        onUpdate={handleUpdateConsultant}
      />
      
      <DeleteConsultantDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        consultant={currentConsultant}
        onDelete={handleDeleteConsultant}
      />
    </div>
  );
};

export default ConsultantManagement;
