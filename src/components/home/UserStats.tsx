
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserStats = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Donations</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Lives Impacted</span>
            <span className="font-medium">36</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Last Donated</span>
            <span className="font-medium">2 months ago</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Full Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default UserStats;
