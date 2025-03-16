
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, HandCoins, Gift, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationForm from "./DonationForm";
import { useNavigate } from "react-router-dom";

const MonetaryDonationCard = () => {
  const navigate = useNavigate();
  
  const donationBenefits = [
    {
      title: "Fund Medical Supplies",
      description: "Help purchase essential medical equipment and supplies for blood donation centers.",
      icon: <CreditCard className="h-5 w-5 text-primary" />
    },
    {
      title: "Support Community Programs",
      description: "Enable outreach programs to encourage more blood donors in underserved areas.",
      icon: <HandCoins className="h-5 w-5 text-primary" />
    },
    {
      title: "Emergency Response",
      description: "Fund rapid response initiatives during crises and natural disasters.",
      icon: <Gift className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Monetary Donations
          </CardTitle>
          <CardDescription>Your financial support helps us save more lives</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 mb-6">
            {donationBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="mt-0.5">{benefit.icon}</div>
                <div>
                  <h4 className="font-medium">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <Button variant="outline" onClick={() => navigate("/fundraising")} className="flex justify-between items-center">
              <span>Start a Fundraiser</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/corporate-giving")} className="flex justify-between items-center">
              <span>Corporate Giving</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <DonationForm 
        purpose="general support"
        initialAmount={50}
        showRecurringOption={true}
      />
    </div>
  );
};

export default MonetaryDonationCard;
