
import React, { useState } from "react";
import { Ambulance } from "@/services";
import AmbulanceSearch from "./ambulance/AmbulanceSearch";
import AmbulanceTable from "./ambulance/AmbulanceTable";
import AmbulanceSkeleton from "./ambulance/AmbulanceSkeleton";
import AddAmbulanceDialog from "./ambulance/AddAmbulanceDialog";
import EditAmbulanceDialog from "./ambulance/EditAmbulanceDialog";
import DeleteAmbulanceDialog from "./ambulance/DeleteAmbulanceDialog";

interface AmbulanceManagementProps {
  ambulances: Ambulance[];
  isLoading: boolean;
  onAdd: (ambulance: Omit<Ambulance, 'id'>) => Promise<void>;
  onUpdate: (ambulance: Ambulance) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const AmbulanceManagement = ({ 
  ambulances, 
  isLoading, 
  onAdd, 
  onUpdate, 
  onDelete 
}: AmbulanceManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAmbulance, setCurrentAmbulance] = useState<Ambulance | null>(null);
  const [newAmbulance, setNewAmbulance] = useState<Omit<Ambulance, 'id'>>({
    vehicleNumber: "",
    location: "",
    status: "Available",
    driverName: "",
    driverPhone: "",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTimeStart: "09:00",
    availableTimeEnd: "17:00",
    isFreeService: true
  });

  // Reset new ambulance form
  const resetNewAmbulanceForm = () => {
    setNewAmbulance({
      vehicleNumber: "",
      location: "",
      status: "Available",
      driverName: "",
      driverPhone: "",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      availableTimeStart: "09:00",
      availableTimeEnd: "17:00",
      isFreeService: true
    });
  };

  // Open edit dialog
  const handleOpenEditDialog = (ambulance: Ambulance) => {
    setCurrentAmbulance(ambulance);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (ambulance: Ambulance) => {
    setCurrentAmbulance(ambulance);
    setIsDeleteDialogOpen(true);
  };

  // Handle add ambulance
  const handleAddAmbulance = async () => {
    await onAdd(newAmbulance);
    setIsAddDialogOpen(false);
    resetNewAmbulanceForm();
  };

  // Handle update ambulance
  const handleUpdateAmbulance = async () => {
    if (currentAmbulance) {
      await onUpdate(currentAmbulance);
      setIsEditDialogOpen(false);
      setCurrentAmbulance(null);
    }
  };

  // Handle delete ambulance
  const handleDeleteAmbulance = async () => {
    if (currentAmbulance) {
      await onDelete(currentAmbulance.id);
      setIsDeleteDialogOpen(false);
      setCurrentAmbulance(null);
    }
  };

  // Toggle ambulance status
  const toggleAmbulanceStatus = (id: number) => {
    const ambulance = ambulances.find(a => a.id === id);
    if (ambulance) {
      const newStatus = ambulance.status === "Available" ? "On Duty" : "Available";
      onUpdate({ ...ambulance, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <AmbulanceSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setIsAddDialogOpen(true)}
      />
      
      {isLoading ? (
        <AmbulanceSkeleton />
      ) : (
        <AmbulanceTable 
          ambulances={ambulances}
          searchTerm={searchTerm}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
          onToggleStatus={toggleAmbulanceStatus}
        />
      )}
      
      <AddAmbulanceDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newAmbulance={newAmbulance}
        setNewAmbulance={setNewAmbulance}
        onAdd={handleAddAmbulance}
      />
      
      <EditAmbulanceDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        ambulance={currentAmbulance}
        setAmbulance={setCurrentAmbulance}
        onUpdate={handleUpdateAmbulance}
      />
      
      <DeleteAmbulanceDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        ambulance={currentAmbulance}
        onDelete={handleDeleteAmbulance}
      />
    </div>
  );
};

export default AmbulanceManagement;
