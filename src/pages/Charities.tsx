
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building, Edit, Trash, Phone, MapPin, Globe, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Charity interface
interface Charity {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  foundedYear: string;
  categories: string[];
}

const CharityCard = ({ charity, onEdit, onDelete }: { 
  charity: Charity, 
  onEdit: (id: string) => void, 
  onDelete: (id: string) => void 
}) => {
  const handleCall = () => {
    window.location.href = `tel:${charity.phone}`;
    toast({
      title: "Calling organization",
      description: `Dialing ${charity.name}`,
    });
  };

  const handleVisitWebsite = () => {
    window.open(charity.website, '_blank');
  };

  return (
    <Card className="mb-3">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Building className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{charity.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {charity.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onEdit(charity.id)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onDelete(charity.id)}>
              <Trash className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={handleCall}>
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={handleVisitWebsite}>
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs">
          <p className="line-clamp-2 text-muted-foreground">{charity.description}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {charity.categories.map((category, index) => (
            <span key={index} className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-xs">
              {category}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CharityForm = ({ charity, onSave, onCancel }: {
  charity?: Charity,
  onSave: (charity: Charity) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Charity>(charity || {
    id: Date.now().toString(),
    name: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    location: "",
    foundedYear: "",
    categories: []
  });

  const [categoryInput, setCategoryInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{charity ? "Edit Organization" : "Add New Organization"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
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
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                name="website" 
                value={formData.website} 
                onChange={handleChange} 
                placeholder="https://" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input 
                id="foundedYear" 
                name="foundedYear" 
                value={formData.foundedYear} 
                onChange={handleChange} 
                placeholder="e.g. 1995" 
              />
            </div>
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
            <Label htmlFor="categories">Categories</Label>
            <div className="flex">
              <Input 
                id="categories" 
                value={categoryInput} 
                onChange={(e) => setCategoryInput(e.target.value)} 
                placeholder="Add a category" 
              />
              <Button type="button" onClick={handleAddCategory} className="ml-2">Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.categories.map((category, index) => (
                <div key={index} className="flex items-center bg-green-50 px-2 py-1 rounded">
                  <span className="text-sm">{category}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Organization</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const CharitiesPage = () => {
  const [charities, setCharities] = useState<Charity[]>([
    {
      id: "1",
      name: "Global Blood Foundation",
      description: "A non-profit organization dedicated to ensuring blood supply for all in need, regardless of location or economic status.",
      phone: "+1 (555) 123-7890",
      email: "info@globalbloodfoundation.org",
      website: "https://www.globalbloodfoundation.org",
      location: "New York, NY",
      foundedYear: "1998",
      categories: ["Medical", "Humanitarian"]
    },
    {
      id: "2",
      name: "LifeSavers Alliance",
      description: "Working to connect blood donors with patients in need and educating the public about the importance of regular blood donation.",
      phone: "+1 (555) 987-6543",
      email: "contact@lifesaversalliance.org",
      website: "https://www.lifesaversalliance.org",
      location: "Chicago, IL",
      foundedYear: "2005",
      categories: ["Education", "Healthcare"]
    },
    {
      id: "3",
      name: "Community Blood Services",
      description: "A local organization focused on maintaining adequate blood supplies for hospitals in the metropolitan area.",
      phone: "+1 (555) 456-7890",
      email: "help@communityblood.org",
      website: "https://www.communityblood.org",
      location: "Boston, MA",
      foundedYear: "2010",
      categories: ["Community", "Healthcare"]
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingCharity, setEditingCharity] = useState<Charity | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharities, setFilteredCharities] = useState<Charity[]>(charities);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCharities(charities);
      return;
    }
    
    const filtered = charities.filter(
      charity => 
        charity.name.toLowerCase().includes(query) ||
        charity.description.toLowerCase().includes(query) ||
        charity.categories.some(cat => cat.toLowerCase().includes(query)) ||
        charity.location.toLowerCase().includes(query)
    );
    
    setFilteredCharities(filtered);
  };
  
  // Edit charity
  const handleEdit = (id: string) => {
    const charity = charities.find(c => c.id === id);
    if (charity) {
      setEditingCharity(charity);
      setShowForm(true);
    }
  };
  
  // Delete charity
  const handleDelete = (id: string) => {
    setCharities(prev => prev.filter(c => c.id !== id));
    setFilteredCharities(prev => prev.filter(c => c.id !== id));
    
    toast({
      title: "Organization removed",
      description: "The organization has been successfully removed.",
    });
  };
  
  // Save charity (add or update)
  const handleSave = (charity: Charity) => {
    if (editingCharity) {
      // Update existing charity
      setCharities(prev => 
        prev.map(c => c.id === charity.id ? charity : c)
      );
      toast({
        title: "Organization updated",
        description: "The organization information has been updated.",
      });
    } else {
      // Add new charity
      setCharities(prev => [...prev, charity]);
      toast({
        title: "Organization added",
        description: "New organization has been successfully added.",
      });
    }
    
    // Reset form state
    setShowForm(false);
    setEditingCharity(null);
    // Update filtered list
    setFilteredCharities(charities);
  };
  
  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCharity(null);
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Building className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      
      {showForm ? (
        <CharityForm 
          charity={editingCharity || undefined} 
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
                placeholder="Search organizations..." 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="medical" className="flex-1">Medical</TabsTrigger>
              <TabsTrigger value="community" className="flex-1">Community</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="mt-3">
                {filteredCharities.length > 0 ? (
                  filteredCharities.map(charity => (
                    <CharityCard 
                      key={charity.id} 
                      charity={charity} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete} 
                    />
                  ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No organizations found</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="medical">
              <div className="mt-3">
                {filteredCharities.filter(c => c.categories.includes("Medical") || c.categories.includes("Healthcare")).length > 0 ? (
                  filteredCharities
                    .filter(c => c.categories.includes("Medical") || c.categories.includes("Healthcare"))
                    .map(charity => (
                      <CharityCard 
                        key={charity.id} 
                        charity={charity} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                      />
                    ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No medical organizations found</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="community">
              <div className="mt-3">
                {filteredCharities.filter(c => c.categories.includes("Community")).length > 0 ? (
                  filteredCharities
                    .filter(c => c.categories.includes("Community"))
                    .map(charity => (
                      <CharityCard 
                        key={charity.id} 
                        charity={charity} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                      />
                    ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No community organizations found</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CharitiesPage;
