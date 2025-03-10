
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ambulance, UserPlus, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServicesManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consultants");
  
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
            <TabsTrigger value="ambulances" className="flex items-center gap-2">
              <Ambulance className="h-4 w-4" />
              <span>Ambulances</span>
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServicesManagement;
