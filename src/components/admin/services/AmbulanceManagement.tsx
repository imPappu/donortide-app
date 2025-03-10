
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
import { Edit, Trash2, Plus, Search, Ambulance as AmbulanceIcon } from "lucide-react";
import { Ambulance } from "@/services/servicesService";
import { Skeleton } from "@/components/ui/skeleton";

interface AmbulanceManagementProps {
  ambulances: Ambulance[];
  isLoading: boolean;
  onAdd: (ambulance: Omit<Ambulance, 'id'>) => Promise<void>;
  onUpdate: (ambulance: Ambulance) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const AmbulanceManagement = ({ 
  ambulances, 
  isLoading, 
  onAdd, 
  onUpdate, 
  onDelete 
}: AmbulanceManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAmbulance, setCurrentAmbulance] = useState<Ambulance | null>(null);
  const [newAmbulance, setNewAmbulance] = useState<Omit<Ambulance, 'id'>>({
    vehicleNumber: "",
    location: "",
    status: "Available",
    driverName: "",
    driverPhone: ""
  });

  // Filter ambulances based on search term
  const filteredAmbulances = ambulances.filter(ambulance =>
    ambulance.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.driverPhone.includes(searchTerm)
  );

  // Reset new ambulance form
  const resetNewAmbulanceForm = () => {
    setNewAmbulance({
      vehicleNumber: "",
      location: "",
      status: "Available",
      driverName: "",
      driverPhone: ""
    });
  };

  // Open edit dialog
  const handleOpenEditDialog = (ambulance: Ambulance) => {
    setCurrentAmbulance(ambulance);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (ambulance: Ambulance) => {
    setCurrentAmbulance(ambulance);
    setIsDeleteDialogOpen(true);
  };

  // Handle add ambulance
  const handleAddAmbulance = async () => {
    await onAdd(newAmbulance);
    setIsAddDialogOpen(false);
    resetNewAmbulanceForm();
  };

  // Handle update ambulance
  const handleUpdateAmbulance = async () => {
    if (currentAmbulance) {
      await onUpdate(currentAmbulance);
      setIsEditDialogOpen(false);
      setCurrentAmbulance(null);
    }
  };

  // Handle delete ambulance
  const handleDeleteAmbulance = async () => {
    if (currentAmbulance) {
      await onDelete(currentAmbulance.id);
      setIsDeleteDialogOpen(false);
      setCurrentAmbulance(null);
    }
  };

  // Toggle ambulance status
  const toggleAmbulanceStatus = (id: number) => {
    const ambulance = ambulances.find(a => a.id === id);
    if (ambulance) {
      const newStatus = ambulance.status === "Available" ? "On Duty" : "Available";
      onUpdate({ ...ambulance, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ambulances..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Ambulance
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
                          onCheckedChange={() => toggleAmbulanceStatus(ambulance.id)}
                        />
                        <span className={ambulance.status === "Available" ? "text-green-600" : "text-amber-600"}>
                          {ambulance.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(ambulance)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteDialog(ambulance)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AmbulanceIcon className="h-10 w-10 mb-2" />
                      <p>{searchTerm ? "No ambulances match your search" : "No ambulances available"}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Add Ambulance Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Ambulance</DialogTitle>
            <DialogDescription>
              Add a new ambulance to the system. It will be immediately available for users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input 
                id="vehicleNumber" 
                value={newAmbulance.vehicleNumber} 
                onChange={(e) => setNewAmbulance({...newAmbulance, vehicleNumber: e.target.value})}
                placeholder="AMB-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={newAmbulance.location} 
                onChange={(e) => setNewAmbulance({...newAmbulance, location: e.target.value})}
                placeholder="Downtown Medical Center"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input 
                id="driverName" 
                value={newAmbulance.driverName} 
                onChange={(e) => setNewAmbulance({...newAmbulance, driverName: e.target.value})}
                placeholder="John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="driverPhone">Driver Phone</Label>
              <Input 
                id="driverPhone" 
                value={newAmbulance.driverPhone} 
                onChange={(e) => setNewAmbulance({...newAmbulance, driverPhone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="status" 
                checked={newAmbulance.status === "Available"} 
                onCheckedChange={(checked) => setNewAmbulance({...newAmbulance, status: checked ? "Available" : "On Duty"})}
              />
              <Label htmlFor="status">Available for service</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAmbulance}>Add Ambulance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Ambulance Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ambulance</DialogTitle>
            <DialogDescription>
              Update the ambulance information.
            </DialogDescription>
          </DialogHeader>
          
          {currentAmbulance && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-vehicleNumber">Vehicle Number</Label>
                <Input 
                  id="edit-vehicleNumber" 
                  value={currentAmbulance.vehicleNumber} 
                  onChange={(e) => setCurrentAmbulance({...currentAmbulance, vehicleNumber: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input 
                  id="edit-location" 
                  value={currentAmbulance.location} 
                  onChange={(e) => setCurrentAmbulance({...currentAmbulance, location: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-driverName">Driver Name</Label>
                <Input 
                  id="edit-driverName" 
                  value={currentAmbulance.driverName} 
                  onChange={(e) => setCurrentAmbulance({...currentAmbulance, driverName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-driverPhone">Driver Phone</Label>
                <Input 
                  id="edit-driverPhone" 
                  value={currentAmbulance.driverPhone} 
                  onChange={(e) => setCurrentAmbulance({...currentAmbulance, driverPhone: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="edit-status" 
                  checked={currentAmbulance.status === "Available"} 
                  onCheckedChange={(checked) => setCurrentAmbulance({...currentAmbulance, status: checked ? "Available" : "On Duty"})}
                />
                <Label htmlFor="edit-status">Available for service</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateAmbulance}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Ambulance Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this ambulance? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentAmbulance && (
            <div className="py-4">
              <p className="mb-2"><strong>Vehicle Number:</strong> {currentAmbulance.vehicleNumber}</p>
              <p className="mb-2"><strong>Location:</strong> {currentAmbulance.location}</p>
              <p className="mb-2"><strong>Driver:</strong> {currentAmbulance.driverName}</p>
              <p><strong>Phone:</strong> {currentAmbulance.driverPhone}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAmbulance}>Delete Ambulance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AmbulanceManagement;
