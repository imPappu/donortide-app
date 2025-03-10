
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BloodDonationFacts = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Blood Donation Facts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2">
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            One donation can save up to three lives
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Every two seconds someone needs blood
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            Type O- is a universal donor blood type
          </li>
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/blog">Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BloodDonationFacts;
