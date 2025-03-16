
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/common/PageHeader";
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Most Donated Items"
        description="Overview of our most frequently donated items" 
      />
      
      <div className="grid grid-cols-1 gap-6 mt-6">
        {donationItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{item.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {item.category}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={item.percentageOfTotal} className="h-2" />
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">Quantity:</span> {item.quantity}
                  </div>
                  <div>
                    <span className="font-medium">Donors:</span> {item.donorCount}
                  </div>
                  {item.totalValue > 0 && (
                    <div>
                      <span className="font-medium">Value:</span> ${item.totalValue.toLocaleString()}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Share:</span> {item.percentageOfTotal}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MostDonatedItems;
