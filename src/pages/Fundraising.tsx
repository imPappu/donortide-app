
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Calendar, Award, DollarSign, PiggyBank, HeartHandshake } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/common/PageHeader";

// Mock data for fundraising campaigns
const fundraisingCampaigns = [
  {
    id: "1",
    title: "Emergency Medical Equipment",
    description: "Help us purchase new blood processing equipment for our central facility.",
    target: 25000,
    raised: 15750,
    daysLeft: 12,
    backers: 142,
    organizer: "Medical Supplies Team",
    image: "https://placehold.co/600x400/e3f2fd/1e3a8a?text=Medical+Equipment",
  },
  {
    id: "2",
    title: "Mobile Blood Drive Vehicles",
    description: "Fund our new mobile blood donation vehicles to reach remote communities.",
    target: 50000,
    raised: 12350,
    daysLeft: 30,
    backers: 98,
    organizer: "Outreach Division",
    image: "https://placehold.co/600x400/ffebee/b71c1c?text=Mobile+Units",
  },
  {
    id: "3",
    title: "Community Awareness Program",
    description: "Support our educational campaign to increase blood donation awareness.",
    target: 10000,
    raised: 7825,
    daysLeft: 5,
    backers: 215,
    organizer: "Education Department",
    image: "https://placehold.co/600x400/e8f5e9/1b5e20?text=Awareness+Program",
  }
];

const Fundraising = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  const [newCampaignForm, setNewCampaignForm] = useState({
    title: "",
    description: "",
    target: "",
    endDate: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newCampaignForm.title || !newCampaignForm.description || !newCampaignForm.target) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would submit the form to an API
    toast({
      title: "Campaign Created",
      description: "Your fundraising campaign has been created successfully.",
    });
    
    // Reset form
    setNewCampaignForm({
      title: "",
      description: "",
      target: "",
      endDate: ""
    });
  };
  
  const calculateProgress = (raised: number, target: number): number => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar title="Fundraising" />
      
      <div className="container max-w-6xl mx-auto px-4 py-6 flex-1 pb-20">
        <PageHeader 
          title="Fundraising Campaigns" 
          description="Support our ongoing initiatives or start your own campaign"
          icon={<PiggyBank className="h-5 w-5 text-primary" />}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Active Campaigns
              </CardTitle>
              <CardDescription>Fundraising initiatives that need your support</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
                  <TabsTrigger value="my" className="flex-1">My Campaigns</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {fundraisingCampaigns.map(campaign => (
                    <Card key={campaign.id} className="overflow-hidden mb-4">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={campaign.image} 
                            alt={campaign.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <h3 className="text-lg font-semibold">{campaign.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>${campaign.raised.toLocaleString()} raised</span>
                              <span>${campaign.target.toLocaleString()} goal</span>
                            </div>
                            <Progress value={calculateProgress(campaign.raised, campaign.target)} className="h-2" />
                          </div>
                          
                          <div className="flex flex-wrap text-xs text-muted-foreground mb-4">
                            <div className="flex items-center mr-4">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{campaign.daysLeft} days left</span>
                            </div>
                            <div className="flex items-center mr-4">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{campaign.backers} backers</span>
                            </div>
                            <div className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              <span>By {campaign.organizer}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 sm:flex-none">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Contribute
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="text-center py-8">
                    <HeartHandshake className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No completed campaigns yet</h3>
                    <p className="text-muted-foreground">Check back later for successful fundraising campaigns</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="my">
                  <div className="text-center py-8">
                    <PiggyBank className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">You haven't created any campaigns</h3>
                    <p className="text-muted-foreground mb-4">Start your own fundraising initiative today</p>
                    <Button>Create Campaign</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <HeartHandshake className="h-5 w-5 mr-2 text-primary" />
                Start a Campaign
              </CardTitle>
              <CardDescription>Create your own fundraising initiative</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-title">Campaign Title</Label>
                  <Input 
                    id="campaign-title" 
                    name="title" 
                    value={newCampaignForm.title}
                    onChange={handleInputChange}
                    placeholder="E.g., Medical Equipment Fund"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Description</Label>
                  <Textarea 
                    id="campaign-description" 
                    name="description"
                    value={newCampaignForm.description}
                    onChange={handleInputChange}
                    placeholder="Describe your fundraising goal"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-target">Funding Target ($)</Label>
                  <Input 
                    id="campaign-target" 
                    name="target"
                    type="number" 
                    value={newCampaignForm.target}
                    onChange={handleInputChange}
                    placeholder="E.g., 5000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-end-date">End Date</Label>
                  <Input 
                    id="campaign-end-date" 
                    name="endDate"
                    type="date" 
                    value={newCampaignForm.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button type="submit" className="w-full">Create Campaign</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How Fundraising Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Create a Campaign</h3>
                <p className="text-sm text-muted-foreground">Set your fundraising goal and tell your story</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Share with Others</h3>
                <p className="text-sm text-muted-foreground">Spread the word about your campaign on social media</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Make a Difference</h3>
                <p className="text-sm text-muted-foreground">Collect funds and track your progress toward your goal</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t flex justify-center">
            <p className="text-sm text-center max-w-xl text-muted-foreground">
              All fundraising campaigns are reviewed by our team. Funds are released for verified medical and donation-related purposes.
              <Button variant="link" className="p-0 h-auto font-normal">Learn more about our policies</Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Fundraising;
