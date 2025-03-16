
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Donor } from '@/types/apiTypes';
import { getDonors } from '@/services/donorService';

const DonorManagement = () => {
  const { toast } = useToast();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const fetchedDonors = await getDonors();
      const completeDonors: Donor[] = fetchedDonors.map(donor => ({
        ...donor,
        totalDonations: donor.totalDonations || 0,
        availableForEmergency: donor.availableForEmergency || false,
        createdAt: donor.createdAt || new Date().toISOString()
      }));
      
      setDonors(completeDonors);
      setFilteredDonors(completeDonors);
    } catch (error) {
      console.error('Error fetching donors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredDonors(donors);
      return;
    }
    
    const filtered = donors.filter(
      donor => 
        donor.name.toLowerCase().includes(query) ||
        donor.email?.toLowerCase().includes(query) ||
        donor.phone?.toLowerCase().includes(query) ||
        donor.bloodType.toLowerCase().includes(query) ||
        donor.location.toLowerCase().includes(query)
    );
    
    setFilteredDonors(filtered);
  };

  const handleAddDonor = () => {
    // This function would normally open a form to add a new donor
    // Since we're just fixing type issues for now, we'll leave the implementation empty
    toast({
      title: 'Add Donor',
      description: 'Donor add functionality would be implemented here.',
    });
  };

  const handleEditDonor = (donor: Donor) => {
    // This function would normally open a form to edit an existing donor
    // Since we're just fixing type issues for now, we'll leave the implementation empty
    toast({
      title: 'Edit Donor',
      description: 'Donor edit functionality would be implemented here.',
    });
  };

  const handleDeleteDonor = (donor: Donor) => {
    // This function would normally show a confirmation dialog before deleting
    // Since we're just fixing type issues for now, we'll leave the implementation empty
    toast({
      title: 'Delete Donor',
      description: 'Donor delete functionality would be implemented here.',
    });
  };

  const handleViewDonor = (donor: Donor) => {
    setSelectedDonor(donor);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Donor Management</h2>
        <Button onClick={handleAddDonor} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Donor
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Registered Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donors..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="py-8 text-center">Loading donors...</div>
          ) : filteredDonors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Blood Type</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Contact</th>
                    <th className="px-4 py-2 text-left">Donations</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor) => (
                    <tr key={donor.id} className="border-b">
                      <td className="px-4 py-2">{donor.name}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          {donor.bloodType}
                        </span>
                      </td>
                      <td className="px-4 py-2">{donor.location}</td>
                      <td className="px-4 py-2">{donor.contactNumber || donor.phone || 'N/A'}</td>
                      <td className="px-4 py-2">{donor.totalDonations}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewDonor(donor)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditDonor(donor)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDonor(donor)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              {searchQuery ? `No donors found matching '${searchQuery}'` : 'No donors registered yet'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorManagement;
