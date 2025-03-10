
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpcomingEvents = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-3 py-1">
            <h4 className="font-medium">Downtown Blood Drive</h4>
            <p className="text-sm text-muted-foreground">This Saturday, 9 AM - 5 PM</p>
          </div>
          <div className="border-l-4 border-primary pl-3 py-1">
            <h4 className="font-medium">Volunteer Training</h4>
            <p className="text-sm text-muted-foreground">Next Tuesday, 6 PM - 8 PM</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">See All Events</Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;
