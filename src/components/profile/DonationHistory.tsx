
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DonationHistory = () => {
  const donations = [
    { 
      date: "May 15, 2023", 
      location: "Central Blood Bank", 
      amount: "450ml",
      success: true,
      certificate: true,
      time: "10:30 AM",
      address: "123 Main St, New York, NY" 
    },
    { 
      date: "January 10, 2023", 
      location: "Memorial Hospital", 
      amount: "450ml",
      success: true,
      certificate: true,
      time: "2:15 PM",
      address: "456 Park Ave, New York, NY"
    },
    { 
      date: "September 5, 2022",

      location: "Community Drive", 
      amount: "450ml",
      success: true,
      certificate: false,
      time: "11:00 AM",
      address: "789 Broadway, New York, NY"
    },
  ];

  return (
    <div className="space-y-4">
      {donations.map((donation, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                <Award className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{donation.location}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      {donation.date}
                      <span className="mx-1.5">•</span>
                      <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      {donation.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      {donation.address}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="inline-block bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-400 text-sm font-medium px-2.5 py-1 rounded-md">
                      {donation.amount}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">Blood donated</div>
                    
                    {donation.certificate && (
                      <button className="flex items-center text-xs text-blue-600 dark:text-blue-400 mt-2 ml-auto">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DonationHistory;
