
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import DonationPayment from "@/components/DonationPayment";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const MonetaryDonationCard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDonateClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a monetary donation",
      });
      navigate("/login");
      return;
    }
  };

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center">
          <Heart className="h-10 w-10 text-primary mr-4" />
          <div>
            <h3 className="font-semibold">Make a Monetary Donation</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Support our organization with a financial contribution
            </p>
            {isAuthenticated ? (
              <DonationPayment 
                trigger={
                  <Button className="mt-3">Donate Now</Button>
                }
                purpose="donation to support our cause"
              />
            ) : (
              <Button className="mt-3" onClick={handleDonateClick}>
                Donate Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonetaryDonationCard;
