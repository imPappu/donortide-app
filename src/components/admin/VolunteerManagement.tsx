
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  skills: string[];
  availability: string;
  notes: string;
  joinDate: string;
}

const VolunteerManagement = () => {
  const { toast } = useToast();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      address: '123 Main St, New York, NY',
      skills: ['first-aid', 'driver', 'medical'],
      availability: 'weekends',
      notes: 'Experienced medical volunteer with 5+ years of experience',
      joinDate: '2022-03-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, Boston, MA',
      skills: ['organizing', 'social-media'],
      availability: 'evenings',
      notes: 'Great with social media campaigns and event organization',
      joinDate: '2022-05-22'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [newVolunteer, setNewVolunteer] = useState<Partial<Volunteer>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    skills: [],
    availability: 'flexible',
    notes: ''
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSkillChange = (
    selection: string, 
    volunteer: Partial<Volunteer>, 
    setVolunteer: React.Dispatch<React.SetStateAction<Partial<Volunteer>>>
  ) => {
    const currentSkills = volunteer.skills || [];
    if (currentSkills.includes(selection)) {
      setVolunteer({
        ...volunteer,
        skills: currentSkills.filter(skill => skill !== selection)
      });
    } else {
      setVolunteer({
        ...volunteer,
        skills: [...currentSkills, selection]
      });
    }
  };

  const handleAddVolunteer = () => {
    const newId = (volunteers.length + 1).toString();
    const now = new Date();
    const joinDate = now.toISOString().split('T')[0];
    
    const newVolunteerFull: Volunteer = {
      id: newId,
      name: newVolunteer.name || '',
      phone: newVolunteer.phone || '',
      email: newVolunteer.email || '',
      address: newVolunteer.address || '',
      skills: newVolunteer.skills || [],
      availability: newVolunteer.availability || 'flexible',
      notes: newVolunteer.notes || '',
      joinDate
    };

    setVolunteers([...volunteers, newVolunteerFull]);
    setNewVolunteer({
      name: '',
      phone: '',
      email: '',
      address: '',
      skills: [],
      availability: 'flexible',
      notes: ''
    });
    setOpenAddDialog(false);
    
    toast({
      title: "Volunteer Added",
      description: `${newVolunteerFull.name} has been added to volunteers`,
    });
  };

  const handleEditVolunteer = () => {
    if (!editingVolunteer) return;
    
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === editingVolunteer.id ? editingVolunteer : volunteer
    ));
    setOpenEditDialog(false);
    
    toast({
      title: "Volunteer Updated",
      description: `${editingVolunteer.name}'s information has been updated`,
    });
  };

  const handleDeleteVolunteer = () => {
    if (!editingVolunteer) return;
    
    setVolunteers(volunteers.filter(volunteer => volunteer.id !== editingVolunteer.id));
    setOpenDeleteDialog(false);
    
    toast({
      title: "Volunteer Removed",
      description: `${editingVolunteer.name} has been removed from volunteers`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const skillLabels: Record<string, string> = {
    'first-aid': 'First Aid',
    'driver': 'Driver',
    'medical': 'Medical',
    'organizing': 'Organizing',
    'social-media': 'Social Media',
    'counseling': 'Counseling',
    'translation': 'Translation',
    'it': 'IT Support'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search volunteers..."
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
                Add Volunteer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Volunteer</DialogTitle>
                <DialogDescription>
                  Register a new volunteer with their details and skills.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newVolunteer.name || ''}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newVolunteer.phone || ''}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newVolunteer.email || ''}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newVolunteer.address || ''}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, address: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(skillLabels).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={(newVolunteer.skills || []).includes(key) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSkillChange(key, newVolunteer, setNewVolunteer)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={newVolunteer.availability || 'flexible'}
                    onValueChange={(value) => setNewVolunteer({ ...newVolunteer, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newVolunteer.notes || ''}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, notes: e.target.value })}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddVolunteer}>Add Volunteer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {view === 'table' ? (
        <div className="rounded-md border">
          <Table>
            <TableCaption>List of registered volunteers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{volunteer.phone}</span>
                      <span className="text-sm text-muted-foreground">{volunteer.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map(skill => (
                        <span 
                          key={skill}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {skillLabels[skill] || skill}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{volunteer.availability}</TableCell>
                  <TableCell>{formatDate(volunteer.joinDate)}</TableCell>
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
                          setEditingVolunteer(volunteer);
                          setOpenEditDialog(true);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => {
                            setEditingVolunteer(volunteer);
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
          {filteredVolunteers.map(volunteer => (
            <Card key={volunteer.id}>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{volunteer.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setEditingVolunteer(volunteer);
                        setOpenEditDialog(true);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          setEditingVolunteer(volunteer);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {volunteer.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {volunteer.email}
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                    <span>{volunteer.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Joined: {formatDate(volunteer.joinDate)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {volunteer.skills.map(skill => (
                      <span 
                        key={skill}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {skillLabels[skill] || skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-1">Availability</h4>
                  <p className="text-sm capitalize">{volunteer.availability}</p>
                </div>
                
                {volunteer.notes && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-1">Notes</h4>
                    <p className="text-sm text-muted-foreground">{volunteer.notes}</p>
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
            <DialogTitle>Edit Volunteer</DialogTitle>
            <DialogDescription>
              Update volunteer information and skills.
            </DialogDescription>
          </DialogHeader>
          
          {editingVolunteer && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingVolunteer.name}
                  onChange={(e) => setEditingVolunteer({ ...editingVolunteer, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editingVolunteer.phone}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, phone: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingVolunteer.email}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editingVolunteer.address}
                  onChange={(e) => setEditingVolunteer({ ...editingVolunteer, address: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(skillLabels).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={editingVolunteer.skills.includes(key) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSkillChange(key, editingVolunteer, setEditingVolunteer)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-availability">Availability</Label>
                <Select
                  value={editingVolunteer.availability}
                  onValueChange={(value) => setEditingVolunteer({ ...editingVolunteer, availability: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingVolunteer.notes}
                  onChange={(e) => setEditingVolunteer({ ...editingVolunteer, notes: e.target.value })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditVolunteer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {editingVolunteer?.name} from volunteers? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteVolunteer}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VolunteerManagement;
