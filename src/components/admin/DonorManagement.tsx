
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDonors, deleteDonor } from "@/services/donorService";
import { Donor } from "@/types/apiTypes";

const DonorManagement = () => {
  const { toast } = useToast();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setIsLoading(true);
    try {
      const data = await getDonors();
      
      if (data.length === 0) {
        // Use mock data for development
        const mockDonors = [
          { id: "1", name: "John Doe", bloodType: "A+", location: "New York, NY", contactNumber: "+1 (555) 123-4567" },
          { id: "2", name: "Jane Smith", bloodType: "O-", location: "Boston, MA", contactNumber: "+1 (555) 987-6543" },
          { id: "3", name: "Robert Johnson", bloodType: "B+", location: "Chicago, IL", contactNumber: "+1 (555) 456-7890" },
          { id: "4", name: "Sarah Williams", bloodType: "AB+", location: "Los Angeles, CA", contactNumber: "+1 (555) 789-0123" },
        ];
        setDonors(mockDonors);
        setFilteredDonors(mockDonors);
      } else {
        setDonors(data);
        setFilteredDonors(data);
      }
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast({
        title: "Error",
        description: "Failed to load donors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDonors(donors);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = donors.filter(
      donor => 
        donor.name.toLowerCase().includes(query) ||
        donor.bloodType.toLowerCase().includes(query) ||
        donor.location.toLowerCase().includes(query)
    );
    
    setFilteredDonors(results);
  }, [searchQuery, donors]);

  const handleDeleteDonor = async (id: string | undefined) => {
    if (!id) return;
    
    try {
      await deleteDonor(id);
      setDonors(donors.filter(donor => donor.id !== id));
      setFilteredDonors(filteredDonors.filter(donor => donor.id !== id));
      toast({
        title: "Success",
        description: "Donor deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting donor:", error);
      toast({
        title: "Error",
        description: "Failed to delete donor",
        variant: "destructive",
      });
    }
  };

  const handleOpenEditModal = (donor: Donor) => {
    setSelectedDonor(donor);
    setIsEditModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Donor Management</CardTitle>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Donor
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search donors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">Loading donors...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <TableRow key={donor.id || donor.name}>
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {donor.bloodType}
                        </span>
                      </TableCell>
                      <TableCell>{donor.location}</TableCell>
                      <TableCell>{donor.contactNumber}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEditModal(donor)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDonor(donor.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No donors found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Add modals for adding/editing donors here (simplified for now) */}
      </CardContent>
    </Card>
  );
};

export default DonorManagement;
