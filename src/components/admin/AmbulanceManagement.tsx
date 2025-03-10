
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Search, 
  MapPin, 
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ambulance {
  id: string;
  vehicleNumber: string;
  registrationNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: string;
  status: 'available' | 'on-call' | 'maintenance' | 'out-of-service';
  location: string;
  lastMaintenance: string;
  notes: string;
}

const AmbulanceManagement = () => {
  const { toast } = useToast();
  const [ambulances, setAmbulances] = useState<Ambulance[]>([
    {
      id: '1',
      vehicleNumber: 'AMB-001',
      registrationNumber: 'KA-01-AB-1234',
      driverName: 'Michael Johnson',
      driverPhone: '+1 (555) 234-5678',
      capacity: '4',
      status: 'available',
      location: 'Central Hospital, New York',
      lastMaintenance: '2023-04-10',
      notes: 'Fully equipped with advanced life support systems'
    },
    {
      id: '2',
      vehicleNumber: 'AMB-002',
      registrationNumber: 'KA-01-CD-5678',
      driverName: 'Robert Smith',
      driverPhone: '+1 (555) 876-5432',
      capacity: '2',
      status: 'on-call',
      location: 'Downtown Medical Center, Boston',
      lastMaintenance: '2023-03-22',
      notes: 'Basic life support ambulance'
    },
    {
      id: '3',
      vehicleNumber: 'AMB-003',
      registrationNumber: 'KA-02-EF-9012',
      driverName: 'David Wilson',
      driverPhone: '+1 (555) 345-6789',
      capacity: '6',
      status: 'maintenance',
      location: 'Service Center',
      lastMaintenance: '2023-05-01',
      notes: 'Scheduled for maintenance until May 5, 2023'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [editingAmbulance, setEditingAmbulance] = useState<Ambulance | null>(null);
  const [newAmbulance, setNewAmbulance] = useState<Partial<Ambulance>>({
    vehicleNumber: '',
    registrationNumber: '',
    driverName: '',
    driverPhone: '',
    capacity: '4',
    status: 'available',
    location: '',
    lastMaintenance: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const filteredAmbulances = ambulances.filter(ambulance =>
    ambulance.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambulance.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAmbulance = () => {
    const newId = (ambulances.length + 1).toString();
    
    const newAmbulanceFull: Ambulance = {
      id: newId,
      vehicleNumber: newAmbulance.vehicleNumber || '',
      registrationNumber: newAmbulance.registrationNumber || '',
      driverName: newAmbulance.driverName || '',
      driverPhone: newAmbulance.driverPhone || '',
      capacity: newAmbulance.capacity || '4',
      status: newAmbulance.status as 'available' || 'available',
      location: newAmbulance.location || '',
      lastMaintenance: newAmbulance.lastMaintenance || new Date().toISOString().split('T')[0],
      notes: newAmbulance.notes || ''
    };

    setAmbulances([...ambulances, newAmbulanceFull]);
    setNewAmbulance({
      vehicleNumber: '',
      registrationNumber: '',
      driverName: '',
      driverPhone: '',
      capacity: '4',
      status: 'available',
      location: '',
      lastMaintenance: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setOpenAddDialog(false);
    
    toast({
      title: "Ambulance Added",
      description: `${newAmbulanceFull.vehicleNumber} has been added to the fleet`,
    });
  };

  const handleEditAmbulance = () => {
    if (!editingAmbulance) return;
    
    setAmbulances(ambulances.map(ambulance => 
      ambulance.id === editingAmbulance.id ? editingAmbulance : ambulance
    ));
    setOpenEditDialog(false);
    
    toast({
      title: "Ambulance Updated",
      description: `${editingAmbulance.vehicleNumber}'s information has been updated`,
    });
  };

  const handleDeleteAmbulance = () => {
    if (!editingAmbulance) return;
    
    setAmbulances(ambulances.filter(ambulance => ambulance.id !== editingAmbulance.id));
    setOpenDeleteDialog(false);
    
    toast({
      title: "Ambulance Removed",
      description: `${editingAmbulance.vehicleNumber} has been removed from the fleet`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Available
          </Badge>
        );
      case 'on-call':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Phone className="mr-1 h-3 w-3" /> On Call
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Maintenance
          </Badge>
        );
      case 'out-of-service':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> Out of Service
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ambulances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('table')}
          >
            Table
          </Button>
          <Button
            variant={view === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('cards')}
          >
            Cards
          </Button>
          
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Ambulance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Ambulance</DialogTitle>
                <DialogDescription>
                  Register a new ambulance with details for fleet management.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      value={newAmbulance.vehicleNumber || ''}
                      onChange={(e) => setNewAmbulance({ ...newAmbulance, vehicleNumber: e.target.value })}
                      placeholder="e.g., AMB-001"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={newAmbulance.registrationNumber || ''}
                      onChange={(e) => setNewAmbulance({ ...newAmbulance, registrationNumber: e.target.value })}
                      placeholder="e.g., KA-01-AB-1234"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input
                      id="driverName"
                      value={newAmbulance.driverName || ''}
                      onChange={(e) => setNewAmbulance({ ...newAmbulance, driverName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="driverPhone">Driver Phone</Label>
                    <Input
                      id="driverPhone"
                      value={newAmbulance.driverPhone || ''}
                      onChange={(e) => setNewAmbulance({ ...newAmbulance, driverPhone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Select
                      value={newAmbulance.capacity || '4'}
                      onValueChange={(value) => setNewAmbulance({ ...newAmbulance, capacity: value })}
                    >
                      <SelectTrigger id="capacity">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Patients</SelectItem>
                        <SelectItem value="4">4 Patients</SelectItem>
                        <SelectItem value="6">6 Patients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newAmbulance.status || 'available'}
                      onValueChange={(value: any) => setNewAmbulance({ ...newAmbulance, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="on-call">On Call</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="out-of-service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location</Label>
                  <Input
                    id="location"
                    value={newAmbulance.location || ''}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, location: e.target.value })}
                    placeholder="e.g., Central Hospital, New York"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
                  <Input
                    id="lastMaintenance"
                    type="date"
                    value={newAmbulance.lastMaintenance || ''}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, lastMaintenance: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAmbulance.notes || ''}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, notes: e.target.value })}
                    placeholder="Additional information about the ambulance"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddAmbulance}>Add Ambulance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === 'table' ? (
        <div className="rounded-md border">
          <Table>
            <TableCaption>Registered ambulances in the fleet</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle No.</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmbulances.map((ambulance) => (
                <TableRow key={ambulance.id}>
                  <TableCell className="font-medium">
                    {ambulance.vehicleNumber}
                    <div className="text-xs text-muted-foreground mt-1">
                      {ambulance.registrationNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{ambulance.driverName}</span>
                      <span className="text-xs text-muted-foreground">{ambulance.driverPhone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ambulance.status)}</TableCell>
                  <TableCell>{ambulance.location}</TableCell>
                  <TableCell>{formatDate(ambulance.lastMaintenance)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setEditingAmbulance(ambulance);
                          setOpenEditDialog(true);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => {
                            setEditingAmbulance(ambulance);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbulances.map(ambulance => (
            <Card key={ambulance.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{ambulance.vehicleNumber}</h3>
                    <p className="text-sm text-muted-foreground">{ambulance.registrationNumber}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ambulance.status)}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setEditingAmbulance(ambulance);
                          setOpenEditDialog(true);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => {
                            setEditingAmbulance(ambulance);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Driver:</span>
                    {ambulance.driverName}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {ambulance.driverPhone}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Capacity:</span>
                    {ambulance.capacity} patients
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                    <span>{ambulance.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Last Maintenance:</span>
                    {formatDate(ambulance.lastMaintenance)}
                  </div>
                </div>
                
                {ambulance.notes && (
                  <div className="mt-3 text-sm">
                    <span className="font-medium">Notes:</span>
                    <p className="mt-1 text-muted-foreground">{ambulance.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Ambulance</DialogTitle>
            <DialogDescription>
              Update ambulance information and status.
            </DialogDescription>
          </DialogHeader>
          
          {editingAmbulance && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-vehicleNumber">Vehicle Number</Label>
                  <Input
                    id="edit-vehicleNumber"
                    value={editingAmbulance.vehicleNumber}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, vehicleNumber: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-registrationNumber">Registration Number</Label>
                  <Input
                    id="edit-registrationNumber"
                    value={editingAmbulance.registrationNumber}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, registrationNumber: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-driverName">Driver Name</Label>
                  <Input
                    id="edit-driverName"
                    value={editingAmbulance.driverName}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, driverName: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-driverPhone">Driver Phone</Label>
                  <Input
                    id="edit-driverPhone"
                    value={editingAmbulance.driverPhone}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, driverPhone: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Select
                    value={editingAmbulance.capacity}
                    onValueChange={(value) => setEditingAmbulance({ ...editingAmbulance, capacity: value })}
                  >
                    <SelectTrigger id="edit-capacity">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Patients</SelectItem>
                      <SelectItem value="4">4 Patients</SelectItem>
                      <SelectItem value="6">6 Patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingAmbulance.status}
                    onValueChange={(value: any) => setEditingAmbulance({ ...editingAmbulance, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="on-call">On Call</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="out-of-service">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Current Location</Label>
                <Input
                  id="edit-location"
                  value={editingAmbulance.location}
                  onChange={(e) => setEditingAmbulance({ ...editingAmbulance, location: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-lastMaintenance">Last Maintenance Date</Label>
                <Input
                  id="edit-lastMaintenance"
                  type="date"
                  value={editingAmbulance.lastMaintenance}
                  onChange={(e) => setEditingAmbulance({ ...editingAmbulance, lastMaintenance: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingAmbulance.notes}
                  onChange={(e) => setEditingAmbulance({ ...editingAmbulance, notes: e.target.value })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditAmbulance}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete ambulance {editingAmbulance?.vehicleNumber}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAmbulance}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AmbulanceManagement;
