
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

const AlgorithmContent = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Matching Algorithm Configuration</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Matching Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Configure how the system matches blood donors with recipients.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Match Radius</span>
                  <div className="text-2xl font-bold">5 km</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Priority Mode</span>
                  <div className="text-2xl font-bold">Urgency</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Blood Type Weight</span>
                  <div className="text-2xl font-bold">90%</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Location Weight</span>
                  <div className="text-2xl font-bold">75%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Statistics on how well the algorithm is performing.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Fulfilled Requests</span>
                  <div className="text-2xl font-bold">87%</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Average Wait Time</span>
                  <div className="text-2xl font-bold">2.3 hours</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Match Quality</span>
                  <div className="text-2xl font-bold">92%</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Response Rate</span>
                  <div className="text-2xl font-bold">78%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Algorithm Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">v2.3.1 (Current)</div>
                <div className="text-sm text-muted-foreground">Deployed on May 15, 2025</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Improved location-based matching with dynamic radius adjustment based on urgency levels.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">v2.2.0</div>
                <div className="text-sm text-muted-foreground">Deployed on March 3, 2025</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Added donor availability scheduling and improved blood type compatibility matrix.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">v2.1.0</div>
                <div className="text-sm text-muted-foreground">Deployed on January 12, 2025</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enhanced urgency detection with multiple factors including patient condition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmContent;
