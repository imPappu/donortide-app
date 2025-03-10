
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Ambulance } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ambulance {
  id: number;
  vehicleNumber: string;
  driver: string;
  status: string;
  lastService: string;
}

interface AmbulanceTabContentProps {
  ambulances: Ambulance[];
  toggleAmbulanceStatus: (id: number) => void;
}

const AmbulanceTabContent = ({ ambulances, toggleAmbulanceStatus }: AmbulanceTabContentProps) => {
  const { toast } = useToast();
  
  const handleAddAmbulance = () => {
    toast({
      title: "Feature in development",
      description: "Ambulance management will be available soon.",
    });
  };

  return (
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
  );
};

export default AmbulanceTabContent;
