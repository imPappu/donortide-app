
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { Consultant } from "@/services";

interface ConsultantTableProps {
  consultants: Consultant[];
  searchTerm: string;
  onEdit: (consultant: Consultant) => void;
  onDelete: (consultant: Consultant) => void;
  onToggleStatus: (id: number) => void;
}

const ConsultantTable = ({ 
  consultants, 
  searchTerm, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: ConsultantTableProps) => {
  // Filter consultants based on search term
  const filteredConsultants = consultants.filter(consultant =>
    consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.phone.includes(searchTerm)
  );

  return (
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
          {filteredConsultants.length > 0 ? (
            filteredConsultants.map((consultant) => (
              <TableRow key={consultant.id}>
                <TableCell className="font-medium">{consultant.name}</TableCell>
                <TableCell>{consultant.specialty}</TableCell>
                <TableCell>{consultant.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={consultant.status === "Available"} 
                      onCheckedChange={() => onToggleStatus(consultant.id)}
                    />
                    <span className={consultant.status === "Available" ? "text-green-600" : "text-amber-600"}>
                      {consultant.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(consultant)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(consultant)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <UserPlus className="h-10 w-10 mb-2" />
                  <p>{searchTerm ? "No consultants match your search" : "No consultants available"}</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsultantTable;
