
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DonationItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  totalValue: number;
  donorCount: number;
  percentageOfTotal: number;
}

const MostDonatedItems = () => {
  // Mock data - would be replaced with actual data from an API
  const donationItems: DonationItem[] = [
    {
      id: "1",
      name: "Whole Blood",
      category: "Blood",
      quantity: 243,
      totalValue: 0,
      donorCount: 243,
      percentageOfTotal: 32,
    },
    {
      id: "2",
      name: "Platelets",
      category: "Blood",
      quantity: 156,
      totalValue: 0,
      donorCount: 128,
      percentageOfTotal: 21,
    },
    {
      id: "3",
      name: "Monetary Donation",
      category: "Money",
      quantity: 97,
      totalValue: 15480,
      donorCount: 97,
      percentageOfTotal: 18,
    },
    {
      id: "4",
      name: "Clothes",
      category: "Goods",
      quantity: 76,
      totalValue: 3800,
      donorCount: 45,
      percentageOfTotal: 12,
    },
    {
      id: "5",
      name: "Non-perishable Food",
      category: "Food",
      quantity: 68,
      totalValue: 2720,
      donorCount: 32,
      percentageOfTotal: 9,
    },
    {
      id: "6",
      name: "Books",
      category: "Educational",
      quantity: 52,
      totalValue: 1560,
      donorCount: 28,
      percentageOfTotal: 8,
    },
  ];

  // Group items by category
  const categories = [...new Set(donationItems.map(item => item.category))];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Most Donated Items</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Donation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-4">
                {donationItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({item.category})
                        </span>
                      </div>
                      <span className="text-sm">{item.percentageOfTotal}%</span>
                    </div>
                    <Progress value={item.percentageOfTotal} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Quantity: {item.quantity}</span>
                      <span>Donors: {item.donorCount}</span>
                      {item.totalValue > 0 && (
                        <span>Value: ${item.totalValue.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {donationItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm">{item.percentageOfTotal}%</span>
                        </div>
                        <Progress value={item.percentageOfTotal} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Quantity: {item.quantity}</span>
                          <span>Donors: {item.donorCount}</span>
                          {item.totalValue > 0 && (
                            <span>Value: ${item.totalValue.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MostDonatedItems;
