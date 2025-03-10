
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Ambulance } from "lucide-react";
import ConsultantManagement from "./ConsultantManagement";
import AmbulanceManagement from "./AmbulanceManagement";
import { Consultant, Ambulance as AmbulanceType } from "@/services";

interface ServicesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  consultants: Consultant[];
  ambulances: AmbulanceType[];
  isLoading: boolean;
  onAddConsultant: (consultant: Omit<Consultant, 'id'>) => Promise<void>;
  onUpdateConsultant: (consultant: Consultant) => Promise<void>;
  onDeleteConsultant: (id: number) => Promise<void>;
  onAddAmbulance: (ambulance: Omit<AmbulanceType, 'id'>) => Promise<void>;
  onUpdateAmbulance: (ambulance: AmbulanceType) => Promise<void>;
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
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="consultants" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Consultants</span>
        </TabsTrigger>
        <TabsTrigger value="ambulances" className="flex items-center gap-2">
          <Ambulance className="h-4 w-4" />
          <span>Ambulances</span>
        </TabsTrigger>
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
    </Tabs>
  );
};

export default ServicesTabs;
