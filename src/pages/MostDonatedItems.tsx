
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const MostDonatedItems = () => {
  // Mock data - in a real app this would come from an API
  const mostDonatedItems = [
    { id: 1, name: "Whole Blood", count: 1245, percentageIncrease: 12 },
    { id: 2, name: "Platelets", count: 876, percentageIncrease: 8 },
    { id: 3, name: "Plasma", count: 654, percentageIncrease: 15 },
    { id: 4, name: "Red Blood Cells", count: 521, percentageIncrease: 5 },
    { id: 5, name: "Money Donations", count: 1892, percentageIncrease: 22 },
    { id: 6, name: "Food Items", count: 432, percentageIncrease: 7 },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Most Donated Items" 
        description="Top donations by our generous community"
        icon={<Award className="h-5 w-5 text-yellow-500" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mostDonatedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-2xl font-bold mt-2">{item.count.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">total donations</p>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>{item.percentageIncrease}%</span>
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
