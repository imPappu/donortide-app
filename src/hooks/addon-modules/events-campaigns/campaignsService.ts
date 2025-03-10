
import { Campaign, CampaignFormData } from './types';
import { API_BASE_URL } from '@/services/apiConfig';
import { fetchWithRetry } from '@/services/dashboardService';
import { useToast } from '@/hooks/use-toast';

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'Blood for All Initiative',
    description: 'A campaign to raise awareness about blood donation in underserved communities.',
    startDate: '2023-10-01T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    status: 'completed',
    category: 'Awareness',
    organizerId: 1,
    createdAt: '2023-09-15T10:00:00Z',
    updatedAt: '2023-09-20T14:30:00Z'
  },
  {
    id: 2,
    title: 'Emergency Blood Reserve Fund',
    description: 'Fundraising campaign to establish an emergency blood reserve for disaster response.',
    startDate: '2023-11-01T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z',
    goal: 50000,
    currentAmount: 32500,
    currency: 'USD',
    status: 'active',
    imageUrl: 'https://placehold.co/600x400/red/white?text=Emergency+Fund',
    category: 'Fundraising',
    organizerId: 2,
    createdAt: '2023-10-15T09:30:00Z',
    updatedAt: '2023-11-10T16:45:00Z'
  },
  {
    id: 3,
    title: 'Blood Donation Technology Innovation',
    description: 'Campaign to fund research for safer and more efficient blood donation technology.',
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-06-30T23:59:59Z',
    goal: 75000,
    currentAmount: 0,
    currency: 'USD',
    status: 'planned',
    imageUrl: 'https://placehold.co/600x400/blue/white?text=Innovation',
    category: 'Research',
    organizerId: 3,
    createdAt: '2023-12-05T11:15:00Z',
    updatedAt: '2023-12-20T10:00:00Z'
  }
];

export const useCampaignsService = () => {
  const { toast } = useToast();

  const getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/campaigns`, {}, 2);
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Using cached data",
        description: "Could not fetch fresh campaigns data. Using cached data instead.",
        variant: "destructive",
      });
      return mockCampaigns;
    }
  };

  const getCampaign = async (id: number): Promise<Campaign | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/campaigns/${id}`, {}, 2);
      if (!response.ok) throw new Error('Failed to fetch campaign');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching campaign with id ${id}:`, error);
      const mockCampaign = mockCampaigns.find(campaign => campaign.id === id);
      toast({
        title: "Using cached data",
        description: "Could not fetch fresh campaign data. Using cached data instead.",
        variant: "destructive",
      });
      return mockCampaign || null;
    }
  };

  const createCampaign = async (campaignData: CampaignFormData): Promise<Campaign | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      }, 2);
      if (!response.ok) throw new Error('Failed to create campaign');
      toast({
        title: "Campaign Created",
        description: "The campaign has been created successfully.",
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Failed to Create Campaign",
        description: "There was an error creating the campaign. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateCampaign = async (id: number, campaignData: Partial<CampaignFormData>): Promise<Campaign | null> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      }, 2);
      if (!response.ok) throw new Error('Failed to update campaign');
      toast({
        title: "Campaign Updated",
        description: "The campaign has been updated successfully.",
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating campaign with id ${id}:`, error);
      toast({
        title: "Failed to Update Campaign",
        description: "There was an error updating the campaign. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteCampaign = async (id: number): Promise<boolean> => {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'DELETE',
      }, 2);
      if (!response.ok) throw new Error('Failed to delete campaign');
      toast({
        title: "Campaign Deleted",
        description: "The campaign has been deleted successfully.",
      });
      return true;
    } catch (error) {
      console.error(`Error deleting campaign with id ${id}:`, error);
      toast({
        title: "Failed to Delete Campaign",
        description: "There was an error deleting the campaign. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    mockCampaigns
  };
};
