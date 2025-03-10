
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BadgeDollarSign, PlusCircle, FileImage, FileVideo, Edit, Trash, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdUnit {
  id: string;
  name: string;
  type: "admob" | "manual";
  unitType: "banner" | "interstitial" | "rewarded";
  unitId?: string;
  status: "active" | "inactive";
  impressions?: number;
  clicks?: number;
  revenue?: number;
}

interface ManualAd {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  imageUrl: string;
  targetUrl: string;
  status: "active" | "inactive";
  clicks: number;
  impressions: number;
}

const AdsManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("admob");
  
  const [admobAdUnits, setAdmobAdUnits] = useState<AdUnit[]>([
    {
      id: "1",
      name: "Home Banner",
      type: "admob",
      unitType: "banner",
      unitId: "ca-app-pub-3940256099942544/6300978111", // Test ID
      status: "active",
      impressions: 12453,
      clicks: 342,
      revenue: 56.78
    },
    {
      id: "2",
      name: "Donation Interstitial",
      type: "admob",
      unitType: "interstitial",
      unitId: "ca-app-pub-3940256099942544/1033173712", // Test ID
      status: "active",
      impressions: 5624,
      clicks: 214,
      revenue: 104.32
    },
    {
      id: "3",
      name: "Rewards Video",
      type: "admob",
      unitType: "rewarded",
      unitId: "ca-app-pub-3940256099942544/5224354917", // Test ID
      status: "inactive",
      impressions: 0,
      clicks: 0,
      revenue: 0
    }
  ]);

  const [manualAds, setManualAds] = useState<ManualAd[]>([
    {
      id: "1",
      title: "Blood Donation Drive",
      type: "image",
      url: "blood-drive-2023",
      imageUrl: "/ads/blood-drive.jpg",
      targetUrl: "https://example.com/blood-drive",
      status: "active",
      clicks: 145,
      impressions: 2450
    },
    {
      id: "2",
      title: "World Blood Donor Day",
      type: "image",
      url: "world-blood-donor-day",
      imageUrl: "/ads/donor-day.jpg",
      targetUrl: "https://example.com/donor-day",
      status: "active",
      clicks: 89,
      impressions: 1756
    }
  ]);

  const [admobConfig, setAdmobConfig] = useState({
    appId: "ca-app-pub-3940256099942544~3347511713", // Test ID
    testMode: true
  });

  const handleAdmobConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setAdmobConfig(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setAdmobConfig(prev => ({ ...prev, [name]: value }));
    }
  };

  const saveAdmobConfig = () => {
    toast({
      title: "Success",
      description: "AdMob configuration saved successfully.",
    });
  };

  const toggleAdStatus = (id: string, type: "admob" | "manual") => {
    if (type === "admob") {
      setAdmobAdUnits(prev => prev.map(ad => 
        ad.id === id ? { ...ad, status: ad.status === "active" ? "inactive" : "active" } : ad
      ));
    } else {
      setManualAds(prev => prev.map(ad => 
        ad.id === id ? { ...ad, status: ad.status === "active" ? "inactive" : "active" } : ad
      ));
    }
    
    toast({
      title: "Status Updated",
      description: "Ad status has been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BadgeDollarSign className="mr-2 h-5 w-5 text-green-500" />
          Ads Management
        </CardTitle>
        <CardDescription>
          Configure and manage AdMob integration and custom advertisements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admob" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="admob" className="flex items-center">
              <BadgeDollarSign className="mr-2 h-4 w-4" />
              AdMob
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center">
              <FileImage className="mr-2 h-4 w-4" />
              Manual Ads
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="admob">
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium mb-2">AdMob Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appId">AdMob App ID</Label>
                    <Input 
                      id="appId" 
                      name="appId" 
                      value={admobConfig.appId} 
                      onChange={handleAdmobConfigChange}
                      placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX" 
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="testMode" 
                        name="testMode" 
                        checked={admobConfig.testMode}
                        onChange={handleAdmobConfigChange}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="testMode">Enable Test Mode</Label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={saveAdmobConfig}>Save AdMob Configuration</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Ad Units</h3>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Ad Unit
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Unit ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admobAdUnits.length > 0 ? (
                      admobAdUnits.map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell className="font-medium">{ad.name}</TableCell>
                          <TableCell>
                            <span className="capitalize">{ad.unitType}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs font-mono">{ad.unitId}</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ad.status === "active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {ad.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleAdStatus(ad.id, "admob")}
                            >
                              {ad.status === "active" ? "Disable" : "Enable"}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No ad units found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manual">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Manual Advertisements</h3>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Ad
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manualAds.length > 0 ? (
                      manualAds.map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell className="font-medium">{ad.title}</TableCell>
                          <TableCell>
                            <span className="flex items-center">
                              {ad.type === "image" ? (
                                <FileImage className="h-4 w-4 mr-1" />
                              ) : (
                                <FileVideo className="h-4 w-4 mr-1" />
                              )}
                              <span className="capitalize">{ad.type}</span>
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="h-10 w-20 bg-gray-100 rounded overflow-hidden">
                              {/* This would display an actual image preview */}
                              <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                                Preview
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ad.status === "active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {ad.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleAdStatus(ad.id, "manual")}
                            >
                              {ad.status === "active" ? "Disable" : "Enable"}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No manual ads found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BadgeDollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="text-2xl font-bold">$165.32</h3>
                    <p className="text-sm text-muted-foreground">Total Revenue (30 days)</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BarChart className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="text-2xl font-bold">18,453</h3>
                    <p className="text-sm text-muted-foreground">Total Impressions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BarChart className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="text-2xl font-bold">654</h3>
                    <p className="text-sm text-muted-foreground">Total Clicks</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Revenue Trend (Last 30 days)</h3>
              <div className="h-60 flex items-end space-x-2">
                {/* This would be replaced with an actual chart */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-green-500 w-full rounded-t" 
                    style={{ 
                      height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                      opacity: 0.7 + (i / 100)
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Ad Performance</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Name</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admobAdUnits
                      .filter(ad => ad.status === "active")
                      .map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell className="font-medium">{ad.name}</TableCell>
                          <TableCell>{ad.impressions?.toLocaleString()}</TableCell>
                          <TableCell>{ad.clicks?.toLocaleString()}</TableCell>
                          <TableCell>
                            {ad.impressions && ad.clicks 
                              ? ((ad.clicks / ad.impressions) * 100).toFixed(2) + "%" 
                              : "0.00%"}
                          </TableCell>
                          <TableCell>${ad.revenue?.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdsManagement;
