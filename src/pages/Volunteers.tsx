
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Edit, Trash, User, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Volunteer interface
interface Volunteer {
  id: string;
  name: string;
  phone: string;
  location: string;
  joinedDate: string;
  skills: string[];
  availability: string;
}

const VolunteerCard = ({ volunteer, onEdit, onDelete }: { 
  volunteer: Volunteer, 
  onEdit: (id: string) => void, 
  onDelete: (id: string) => void 
}) => {
  const handleCall = () => {
    window.location.href = `tel:${volunteer.phone}`;
    toast({
      title: "Calling volunteer",
      description: `Dialing ${volunteer.name}`,
    });
  };

  return (
    <Card className="mb-3">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{volunteer.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {volunteer.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onEdit(volunteer.id)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onDelete(volunteer.id)}>
              <Trash className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={handleCall}>
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Joined:</span>
            <p className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {volunteer.joinedDate}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Skills:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {volunteer.skills.map((skill, index) => (
                <span key={index} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VolunteerForm = ({ volunteer, onSave, onCancel }: {
  volunteer?: Volunteer,
  onSave: (volunteer: Volunteer) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Volunteer>(volunteer || {
    id: Date.now().toString(),
    name: "",
    phone: "",
    location: "",
    joinedDate: new Date().toISOString().split('T')[0],
    skills: [],
    availability: "Weekends"
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{volunteer ? "Edit Volunteer" : "Add New Volunteer"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <select 
              id="availability" 
              name="availability" 
              value={formData.availability} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex">
              <Input 
                id="skills" 
                value={skillInput} 
                onChange={(e) => setSkillInput(e.target.value)} 
                placeholder="Add a skill" 
              />
              <Button type="button" onClick={handleAddSkill} className="ml-2">Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <span className="text-sm">{skill}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Volunteer</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Alex Johnson",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinedDate: "2023-05-15",
      skills: ["First Aid", "Driving", "Organizing"],
      availability: "Weekends"
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      phone: "+1 (555) 987-6543",
      location: "Boston, MA",
      joinedDate: "2023-07-22",
      skills: ["Medical Training", "Counseling"],
      availability: "Evenings"
    },
    {
      id: "3",
      name: "David Chen",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinedDate: "2023-09-10",
      skills: ["Translation", "Communication", "Event Planning"],
      availability: "Weekdays"
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>(volunteers);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredVolunteers(volunteers);
      return;
    }
    
    const filtered = volunteers.filter(
      volunteer => 
        volunteer.name.toLowerCase().includes(query) ||
        volunteer.skills.some(skill => skill.toLowerCase().includes(query)) ||
        volunteer.location.toLowerCase().includes(query)
    );
    
    setFilteredVolunteers(filtered);
  };
  
  // Edit volunteer
  const handleEdit = (id: string) => {
    const volunteer = volunteers.find(v => v.id === id);
    if (volunteer) {
      setEditingVolunteer(volunteer);
      setShowForm(true);
    }
  };
  
  // Delete volunteer
  const handleDelete = (id: string) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
    setFilteredVolunteers(prev => prev.filter(v => v.id !== id));
    
    toast({
      title: "Volunteer removed",
      description: "The volunteer has been successfully removed.",
    });
  };
  
  // Save volunteer (add or update)
  const handleSave = (volunteer: Volunteer) => {
    if (editingVolunteer) {
      // Update existing volunteer
      setVolunteers(prev => 
        prev.map(v => v.id === volunteer.id ? volunteer : v)
      );
      toast({
        title: "Volunteer updated",
        description: "The volunteer information has been updated.",
      });
    } else {
      // Add new volunteer
      setVolunteers(prev => [...prev, volunteer]);
      toast({
        title: "Volunteer added",
        description: "New volunteer has been successfully added.",
      });
    }
    
    // Reset form state
    setShowForm(false);
    setEditingVolunteer(null);
    // Update filtered list
    setFilteredVolunteers(volunteers);
  };
  
  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingVolunteer(null);
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Volunteers</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      
      {showForm ? (
        <VolunteerForm 
          volunteer={editingVolunteer || undefined} 
          onSave={handleSave} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9" 
                placeholder="Search volunteers..." 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="weekends" className="flex-1">Weekends</TabsTrigger>
              <TabsTrigger value="weekdays" className="flex-1">Weekdays</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="mt-3">
                {filteredVolunteers.length > 0 ? (
                  filteredVolunteers.map(volunteer => (
                    <VolunteerCard 
                      key={volunteer.id} 
                      volunteer={volunteer} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete} 
                    />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No volunteers found</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="weekends">
              <div className="mt-3">
                {filteredVolunteers.filter(v => v.availability === "Weekends").length > 0 ? (
                  filteredVolunteers
                    .filter(v => v.availability === "Weekends")
                    .map(volunteer => (
                      <VolunteerCard 
                        key={volunteer.id} 
                        volunteer={volunteer} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                      />
                    ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No weekend volunteers found</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="weekdays">
              <div className="mt-3">
                {filteredVolunteers.filter(v => v.availability === "Weekdays").length > 0 ? (
                  filteredVolunteers
                    .filter(v => v.availability === "Weekdays")
                    .map(volunteer => (
                      <VolunteerCard 
                        key={volunteer.id} 
                        volunteer={volunteer} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                      />
                    ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No weekday volunteers found</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default VolunteersPage;
