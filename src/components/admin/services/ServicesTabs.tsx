
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ambulance, Consultant } from "@/services";
import ConsultantManagement from "./ConsultantManagement";
import AmbulanceManagement from "./AmbulanceManagement";

interface ServicesTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  consultants: Consultant[];
  ambulances: Ambulance[];
  isLoading: boolean;
  onAddConsultant: (consultant: Omit<Consultant, 'id'>) => Promise<void>;
  onUpdateConsultant: (consultant: Consultant) => Promise<void>;
  onDeleteConsultant: (id: number) => Promise<void>;
  onAddAmbulance: (ambulance: Omit<Ambulance, 'id'>) => Promise<void>;
  onUpdateAmbulance: (ambulance: Ambulance) => Promise<void>;
  onDeleteAmbulance: (id: number) => Promise<void>;
}

const ServicesTabs = ({
  activeTab,
  setActiveTab,
  consultants,
  ambulances,
  isLoading,
  onAddConsultant,
  onUpdateConsultant,
  onDeleteConsultant,
  onAddAmbulance,
  onUpdateAmbulance,
  onDeleteAmbulance
}: ServicesTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="consultants">Consultants</TabsTrigger>
        <TabsTrigger value="ambulances">Ambulance Services</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consultants">
        <ConsultantManagement 
          consultants={consultants}
          isLoading={isLoading}
          onAdd={onAddConsultant}
          onUpdate={onUpdateConsultant}
          onDelete={onDeleteConsultant}
        />
      </TabsContent>
      
      <TabsContent value="ambulances">
        <AmbulanceManagement 
          ambulances={ambulances}
          isLoading={isLoading}
          onAdd={onAddAmbulance}
          onUpdate={onUpdateAmbulance}
          onDelete={onDeleteAmbulance}
        />
      </TabsContent>
      
      <TabsContent value="appointments">
        <div className="text-center py-8 text-muted-foreground">
          <p>Appointment management coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ServicesTabs;
