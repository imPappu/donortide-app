
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash, Building } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Organization, getOrganizations, createOrganization, updateOrganization, deleteOrganization } from "@/services/organizationService";
import DBErrorAlert from "./DBErrorAlert";

const OrganizationManagement = () => {
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Organization>({
    name: "",
    type: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    status: "active"
  });

  // Fetch organizations on component mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrganizations();
      setOrganizations(data);
      setFilteredOrganizations(data);
    } catch (err) {
      setError("Failed to load organizations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter organizations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrganizations(organizations);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = organizations.filter(
      org => 
        org.name.toLowerCase().includes(query) ||
        org.type.toLowerCase().includes(query) ||
        org.contactPerson.toLowerCase().includes(query)
    );
    
    setFilteredOrganizations(results);
  }, [searchQuery, organizations]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value as "active" | "inactive"
    }));
  };

  // Open dialog for adding new organization
  const handleAddOrganization = () => {
    setFormData({
      name: "",
      type: "",
      address: "",
      contactPerson: "",
      contactNumber: "",
      status: "active"
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  // Open dialog for editing organization
  const handleEditOrganization = (org: Organization) => {
    setFormData(org);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && formData.id) {
        // Update existing organization
        const updated = await updateOrganization(formData.id, formData);
        setOrganizations(prev => prev.map(org => org.id === formData.id ? updated : org));
        toast({
          title: "Success",
          description: "Organization updated successfully",
        });
      } else {
        // Create new organization
        const created = await createOrganization(formData);
        setOrganizations(prev => [...prev, created]);
        toast({
          title: "Success",
          description: "Organization added successfully",
        });
      }
      setIsDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  // Handle organization deletion
  const handleDeleteOrganization = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      setLoading(true);
      setError(null);
      try {
        await deleteOrganization(id);
        setOrganizations(prev => prev.filter(org => org.id !== id));
        toast({
          title: "Success",
          description: "Organization deleted successfully",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while deleting");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organization Management</CardTitle>
        <Button onClick={handleAddOrganization}>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <DBErrorAlert 
            error={error} 
            severity="error" 
            onDismiss={() => setError(null)} 
            className="mb-4"
          />
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search organizations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && organizations.length === 0 ? (
          <div className="text-center py-8">Loading organizations...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-500" />
                          {org.name}
                        </div>
                      </TableCell>
                      <TableCell>{org.type}</TableCell>
                      <TableCell>{org.contactPerson}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            org.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {org.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditOrganization(org)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => org.id && handleDeleteOrganization(org.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No organizations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Organization Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Organization" : "Add Organization"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OrganizationManagement;
