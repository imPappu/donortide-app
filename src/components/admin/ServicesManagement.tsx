
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConsultantTabContent from "./services/ConsultantTabContent";
import AppointmentTabContent from "./services/AppointmentTabContent";
import AppointmentDialog from "./services/AppointmentDialog";

const ServicesManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consultants");
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  
  // Sample data for consultants
  const [consultants, setConsultants] = useState([
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Hematology", status: "Available", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Dr. Michael Brown", specialty: "Internal Medicine", status: "Available", phone: "+1 (555) 987-6543" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Transfusion Medicine", status: "Busy", phone: "+1 (555) 456-7890" }
  ]);
  
  // Sample data for appointments
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "John Doe", date: "2023-08-15", time: "10:00 AM", type: "Blood Donation", status: "Confirmed" },
    { id: 2, patientName: "Jane Smith", date: "2023-08-16", time: "11:30 AM", type: "Donor Checkup", status: "Pending" },
    { id: 3, patientName: "Robert Brown", date: "2023-08-17", time: "02:00 PM", type: "Medical Consultation", status: "Confirmed" }
  ]);
  
  const handleAddAppointment = () => {
    setIsAppointmentDialogOpen(true);
  };
  
  const handleSaveAppointment = () => {
    setIsAppointmentDialogOpen(false);
    toast({
      title: "Appointment Added",
      description: "The appointment has been successfully added to the schedule.",
    });
  };
  
  const toggleConsultantStatus = (id: number) => {
    setConsultants(prevConsultants => 
      prevConsultants.map(consultant => {
        if (consultant.id === id) {
          const newStatus = consultant.status === "Available" ? "Busy" : "Available";
          return { ...consultant, status: newStatus };
        }
        return consultant;
      })
    );
    
    toast({
      title: "Status Updated",
      description: "Consultant status has been updated successfully.",
    });
  };
  
  const toggleAppointmentStatus = (id: number) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => {
        if (appointment.id === id) {
          const newStatus = appointment.status === "Confirmed" ? "Pending" : "Confirmed";
          return { ...appointment, status: newStatus };
        }
        return appointment;
      })
    );
    
    toast({
      title: "Status Updated",
      description: "Appointment status has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consultants" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Consultants</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultants">
            <ConsultantTabContent 
              consultants={consultants} 
              toggleConsultantStatus={toggleConsultantStatus} 
            />
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentTabContent 
              appointments={appointments} 
              toggleAppointmentStatus={toggleAppointmentStatus}
              handleAddAppointment={handleAddAppointment}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Add Appointment Dialog */}
      <AppointmentDialog 
        isOpen={isAppointmentDialogOpen}
        onOpenChange={setIsAppointmentDialogOpen}
        onSave={handleSaveAppointment}
      />
    </Card>
  );
};

export default ServicesManagement;
