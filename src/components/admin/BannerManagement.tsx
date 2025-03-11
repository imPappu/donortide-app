import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banner } from "@/types/apiTypes";
import { getPastBanners, getActiveBanners, deleteBanner } from "@/services/bannerService";
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BannerManagementProps {
  // You can define any props the component needs here
}

const BannerManagement = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching banners from an API
    setTimeout(() => {
      // Using mockData with correct properties
      const mockData = [
        {
          id: "1",
          title: "Blood Donation Drive",
          content: "Join our upcoming blood donation drive",
          imageUrl: "/placeholder.svg",
          link: "https://example.com",
          startDate: "2023-06-01T00:00:00Z",
          endDate: "2023-06-30T23:59:59Z",
          isActive: true,
          createdAt: "2023-05-15T00:00:00Z",
          updatedAt: "2023-05-15T00:00:00Z",
          description: "Help us save lives by donating blood",
          linkUrl: "https://example.com/donate",
          displayOrder: 1,
          position: "top"
        },
        {
          id: "2",
          title: "World Blood Donor Day",
          content: "Celebrate World Blood Donor Day with us",
          imageUrl: "/placeholder.svg",
          link: "https://example.com/wbdd",
          startDate: "2023-06-14T00:00:00Z",
          endDate: "2023-06-14T23:59:59Z",
          isActive: true,
          createdAt: "2023-06-01T00:00:00Z",
          updatedAt: "2023-06-01T00:00:00Z",
          description: "World Blood Donor Day special event",
          linkUrl: "https://example.com/wbdd",
          displayOrder: 2,
          position: "middle"
        },
        {
          id: "3",
          title: "Thank You Donors",
          content: "A big thank you to all our blood donors",
          imageUrl: "/placeholder.svg",
          link: "https://example.com/thank-you",
          startDate: "2023-05-01T00:00:00Z",
          endDate: "2023-05-31T23:59:59Z",
          isActive: false,
          createdAt: "2023-04-15T00:00:00Z",
          updatedAt: "2023-04-15T00:00:00Z",
          description: "Appreciation for our donors",
          linkUrl: "https://example.com/thank-you",
          displayOrder: 3,
          position: "bottom"
        }
      ];
      setBanners(mockData);
      setFilteredBanners(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = banners.filter(banner =>
      banner.title.toLowerCase().includes(query.toLowerCase()) ||
      banner.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBanners(filtered);
  };

  const handlePreviewBanner = (banner: Banner) => {
    // Implement preview logic here
    alert(`Previewing banner: ${banner.title}`);
  };

  const handleEditBanner = (banner: Banner) => {
    // Implement edit logic here
    navigate(`/admin/banners/edit/${banner.id}`);
  };

  const handleDeleteBanner = async (bannerId: string) => {
    // Implement delete logic here
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (confirmDelete) {
      // Call the deleteBanner service function
      await deleteBanner(bannerId);

      // Update the state to remove the deleted banner
      setBanners(banners.filter(banner => banner.id !== bannerId));
      setFilteredBanners(filteredBanners.filter(banner => banner.id !== bannerId));

      alert(`Banner with ID ${bannerId} deleted successfully.`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Banners</CardTitle>
        <CardDescription>Create, edit, and manage banners on your platform</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search banners..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button onClick={() => navigate('/admin/banners/new')}>Add Banner</Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">Loading banners...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBanners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell>{new Date(banner.startDate).toLocaleDateString()} - {banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'Ongoing'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{banner.displayOrder || 'N/A'} - {banner.position || 'Default'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handlePreviewBanner(banner)} title="Preview Banner">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditBanner(banner)} title="Edit Banner">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteBanner(banner.id)} title="Delete Banner">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M3 6H5H21"/>
                          <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6"/>
                          <line x1="8" y1="6" x2="8" y2="10"/>
                          <line x1="12" y1="6" x2="12" y2="10"/>
                          <line x1="16" y1="6" x2="16" y2="10"/>
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerManagement;
