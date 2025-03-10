
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServicesTabs from "./services/ServicesTabs";
import { useConsultantManagement } from "@/hooks/useConsultantManagement";
import { useAmbulanceManagement } from "@/hooks/useAmbulanceManagement";

const ServicesManagement = () => {
  const [activeTab, setActiveTab] = useState("consultants");
  
  // Use our custom hooks
  const { 
    consultants, 
    isLoading: consultantsLoading, 
    fetchConsultants,
    handleAddConsultant,
    handleUpdateConsultant,
    handleDeleteConsultant
  } = useConsultantManagement();
  
  const { 
    ambulances, 
    isLoading: ambulancesLoading,
    fetchAmbulances,
    handleAddAmbulance,
    handleUpdateAmbulance,
    handleDeleteAmbulance
  } = useAmbulanceManagement();

  // Fetch consultants and ambulances when the component mounts
  useEffect(() => {
    fetchConsultants();
    fetchAmbulances();
  }, []);

  // Determine if anything is loading
  const isLoading = consultantsLoading || ambulancesLoading;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Management</CardTitle>
      </CardHeader>
      <CardContent>
        <ServicesTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          consultants={consultants}
          ambulances={ambulances}
          isLoading={isLoading}
          onAddConsultant={handleAddConsultant}
          onUpdateConsultant={handleUpdateConsultant}
          onDeleteConsultant={handleDeleteConsultant}
          onAddAmbulance={handleAddAmbulance}
          onUpdateAmbulance={handleUpdateAmbulance}
          onDeleteAmbulance={handleDeleteAmbulance}
        />
      </CardContent>
    </Card>
  );
};

export default ServicesManagement;
