
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const DonationHistory = () => {
  const donations = [
    { date: "May 15, 2023", location: "Central Blood Bank", amount: "450ml" },
    { date: "January 10, 2023", location: "Memorial Hospital", amount: "450ml" },
    { date: "September 5, 2022", location: "Community Drive", amount: "450ml" },
  ];

  return (
    <div className="space-y-4">
      {donations.map((donation, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{donation.location}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {donation.date}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{donation.amount}</span>
                <div className="text-xs text-muted-foreground">Blood donated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DonationHistory;
