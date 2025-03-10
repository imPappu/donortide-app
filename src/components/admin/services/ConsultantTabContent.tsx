
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Consultant {
  id: number;
  name: string;
  specialty: string;
  status: string;
  phone: string;
}

interface ConsultantTabContentProps {
  consultants: Consultant[];
  toggleConsultantStatus: (id: number) => void;
}

const ConsultantTabContent = ({ consultants, toggleConsultantStatus }: ConsultantTabContentProps) => {
  const { toast } = useToast();
  
  const handleAddConsultant = () => {
    toast({
      title: "Feature in development",
      description: "Consultant management will be available soon.",
    });
  };

  return (
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
  );
};

export default ConsultantTabContent;
