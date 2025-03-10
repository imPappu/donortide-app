
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Ambulance } from "lucide-react";
import { Ambulance as AmbulanceType } from "@/services";

interface AmbulanceTableProps {
  ambulances: AmbulanceType[];
  searchTerm: string;
  onEdit: (ambulance: AmbulanceType) => void;
  onDelete: (ambulance: AmbulanceType) => void;
  onToggleStatus: (id: number) => void;
}

const AmbulanceTable = ({ 
  ambulances, 
  searchTerm, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: AmbulanceTableProps) => {
  // Filter ambulances based on search term
  const filteredAmbulances = ambulances.filter(ambulance =>
    ambulance.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.driverPhone.includes(searchTerm)
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAmbulances.length > 0 ? (
            filteredAmbulances.map((ambulance) => (
              <TableRow key={ambulance.id}>
                <TableCell className="font-medium">{ambulance.vehicleNumber}</TableCell>
                <TableCell>{ambulance.location}</TableCell>
                <TableCell>{ambulance.driverName}</TableCell>
                <TableCell>{ambulance.driverPhone}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={ambulance.status === "Available"} 
                      onCheckedChange={() => onToggleStatus(ambulance.id)}
                    />
                    <span className={ambulance.status === "Available" ? "text-green-600" : "text-amber-600"}>
                      {ambulance.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(ambulance)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(ambulance)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Ambulance className="h-10 w-10 mb-2" />
                  <p>{searchTerm ? "No ambulances match your search" : "No ambulances available"}</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AmbulanceTable;
