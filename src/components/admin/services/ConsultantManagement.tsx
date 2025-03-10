
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Search, UserPlus } from "lucide-react";
import { Consultant } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";

interface ConsultantManagementProps {
  consultants: Consultant[];
  isLoading: boolean;
  onAdd: (consultant: Omit<Consultant, 'id'>) => Promise<void>;
  onUpdate: (consultant: Consultant) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ConsultantManagement = ({ 
  consultants, 
  isLoading, 
  onAdd, 
  onUpdate, 
  onDelete 
}: ConsultantManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState<Consultant | null>(null);
  const [newConsultant, setNewConsultant] = useState<Omit<Consultant, 'id'>>({
    name: "",
    specialty: "",
    status: "Available",
    phone: ""
  });

  // Filter consultants based on search term
  const filteredConsultants = consultants.filter(consultant =>
    consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.phone.includes(searchTerm)
  );

  // Reset new consultant form
  const resetNewConsultantForm = () => {
    setNewConsultant({
      name: "",
      specialty: "",
      status: "Available",
      phone: ""
    });
  };

  // Open edit dialog
  const handleOpenEditDialog = (consultant: Consultant) => {
    setCurrentConsultant(consultant);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (consultant: Consultant) => {
    setCurrentConsultant(consultant);
    setIsDeleteDialogOpen(true);
  };

  // Handle add consultant
  const handleAddConsultant = async () => {
    await onAdd(newConsultant);
    setIsAddDialogOpen(false);
    resetNewConsultantForm();
  };

  // Handle update consultant
  const handleUpdateConsultant = async () => {
    if (currentConsultant) {
      await onUpdate(currentConsultant);
      setIsEditDialogOpen(false);
      setCurrentConsultant(null);
    }
  };

  // Handle delete consultant
  const handleDeleteConsultant = async () => {
    if (currentConsultant) {
      await onDelete(currentConsultant.id);
      setIsDeleteDialogOpen(false);
      setCurrentConsultant(null);
    }
  };

  // Toggle consultant status
  const toggleConsultantStatus = (id: number) => {
    const consultant = consultants.find(c => c.id === id);
    if (consultant) {
      const newStatus = consultant.status === "Available" ? "Busy" : "Available";
      onUpdate({ ...consultant, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search consultants..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Consultant
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                          onCheckedChange={() => toggleConsultantStatus(consultant.id)}
                        />
                        <span className={consultant.status === "Available" ? "text-green-600" : "text-amber-600"}>
                          {consultant.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(consultant)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteDialog(consultant)}>
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
      )}
      
      {/* Add Consultant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Consultant</DialogTitle>
            <DialogDescription>
              Add a new consultant to the system. They will be immediately visible to users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newConsultant.name} 
                onChange={(e) => setNewConsultant({...newConsultant, name: e.target.value})}
                placeholder="Dr. John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input 
                id="specialty" 
                value={newConsultant.specialty} 
                onChange={(e) => setNewConsultant({...newConsultant, specialty: e.target.value})}
                placeholder="Hematology"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={newConsultant.phone} 
                onChange={(e) => setNewConsultant({...newConsultant, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="status" 
                checked={newConsultant.status === "Available"} 
                onCheckedChange={(checked) => setNewConsultant({...newConsultant, status: checked ? "Available" : "Busy"})}
              />
              <Label htmlFor="status">Available for consultations</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddConsultant}>Add Consultant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Consultant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Consultant</DialogTitle>
            <DialogDescription>
              Update the consultant's information.
            </DialogDescription>
          </DialogHeader>
          
          {currentConsultant && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentConsultant.name} 
                  onChange={(e) => setCurrentConsultant({...currentConsultant, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-specialty">Specialty</Label>
                <Input 
                  id="edit-specialty" 
                  value={currentConsultant.specialty} 
                  onChange={(e) => setCurrentConsultant({...currentConsultant, specialty: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input 
                  id="edit-phone" 
                  value={currentConsultant.phone} 
                  onChange={(e) => setCurrentConsultant({...currentConsultant, phone: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="edit-status" 
                  checked={currentConsultant.status === "Available"} 
                  onCheckedChange={(checked) => setCurrentConsultant({...currentConsultant, status: checked ? "Available" : "Busy"})}
                />
                <Label htmlFor="edit-status">Available for consultations</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateConsultant}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Consultant Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this consultant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentConsultant && (
            <div className="py-4">
              <p className="mb-2"><strong>Name:</strong> {currentConsultant.name}</p>
              <p className="mb-2"><strong>Specialty:</strong> {currentConsultant.specialty}</p>
              <p><strong>Phone:</strong> {currentConsultant.phone}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConsultant}>Delete Consultant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultantManagement;
