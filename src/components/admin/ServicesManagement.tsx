
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ambulance, UserPlus, Edit, Trash2, Plus, CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  
  // Sample data for ambulances
  const [ambulances, setAmbulances] = useState([
    { id: 1, vehicleNumber: "AMB-001", driver: "John Smith", status: "Available", lastService: "2023-05-15" },
    { id: 2, vehicleNumber: "AMB-002", driver: "Robert Johnson", status: "On Call", lastService: "2023-06-20" },
    { id: 3, vehicleNumber: "AMB-003", driver: "Maria Garcia", status: "Maintenance", lastService: "2023-07-10" }
  ]);
  
  // Sample data for appointments
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "John Doe", date: "2023-08-15", time: "10:00 AM", type: "Blood Donation", status: "Confirmed" },
    { id: 2, patientName: "Jane Smith", date: "2023-08-16", time: "11:30 AM", type: "Donor Checkup", status: "Pending" },
    { id: 3, patientName: "Robert Brown", date: "2023-08-17", time: "02:00 PM", type: "Medical Consultation", status: "Confirmed" }
  ]);
  
  const handleAddConsultant = () => {
    toast({
      title: "Feature in development",
      description: "Consultant management will be available soon.",
    });
  };
  
  const handleAddAmbulance = () => {
    toast({
      title: "Feature in development",
      description: "Ambulance management will be available soon.",
    });
  };
  
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
  
  const toggleAmbulanceStatus = (id: number) => {
    setAmbulances(prevAmbulances => 
      prevAmbulances.map(ambulance => {
        if (ambulance.id === id) {
          const statuses = ["Available", "On Call", "Maintenance"];
          const currentIndex = statuses.indexOf(ambulance.status);
          const newStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...ambulance, status: newStatus };
        }
        return ambulance;
      })
    );
    
    toast({
      title: "Status Updated",
      description: "Ambulance status has been updated successfully.",
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="consultants" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Consultants</span>
            </TabsTrigger>
            <TabsTrigger value="ambulances" className="flex items-center gap-2">
              <Ambulance className="h-4 w-4" />
              <span>Ambulances</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultants">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Manage blood donation consultants and their availability.
                </div>
                <Button size="sm" onClick={handleAddConsultant}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Consultant
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultants.map((consultant) => (
                      <TableRow key={consultant.id}>
                        <TableCell className="font-medium">{consultant.name}</TableCell>
                        <TableCell>{consultant.specialty}</TableCell>
                        <TableCell>{consultant.phone}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={consultant.status === "Available"} 
                              onCheckedChange={() => toggleConsultantStatus(consultant.id)}
                            />
                            <span className={consultant.status === "Available" ? "text-green-600" : "text-amber-600"}>
                              {consultant.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ambulances">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Manage ambulances and emergency vehicles for blood donation services.
                </div>
                <Button size="sm" onClick={handleAddAmbulance}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Ambulance
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Number</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Last Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ambulances.map((ambulance) => (
                      <TableRow key={ambulance.id}>
                        <TableCell className="font-medium">{ambulance.vehicleNumber}</TableCell>
                        <TableCell>{ambulance.driver}</TableCell>
                        <TableCell>{ambulance.lastService}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={
                                ambulance.status === "Available" 
                                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                                  : ambulance.status === "On Call"
                                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              }
                              onClick={() => toggleAmbulanceStatus(ambulance.id)}
                            >
                              {ambulance.status}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Manage appointment schedules for blood donation services.
                </div>
                <Button size="sm" onClick={handleAddAppointment}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Appointment
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={appointment.status === "Confirmed"} 
                              onCheckedChange={() => toggleAppointmentStatus(appointment.id)}
                            />
                            <span className={appointment.status === "Confirmed" ? "text-green-600" : "text-amber-600"}>
                              {appointment.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Add Appointment Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
            <DialogDescription>
              Create a new appointment slot in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Patient Name
              </Label>
              <Input id="name" placeholder="Full name" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input id="date" type="date" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input id="time" type="time" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select defaultValue="donation">
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donation">Blood Donation</SelectItem>
                  <SelectItem value="checkup">Donor Checkup</SelectItem>
                  <SelectItem value="consultation">Medical Consultation</SelectItem>
                  <SelectItem value="evaluation">Eligibility Evaluation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="pending">
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAppointment}>
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ServicesManagement;
