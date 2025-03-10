
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Box, Cog, AlertTriangle } from "lucide-react";
import AddonUploader from "../components/AddonUploader";
import { AddonModule } from "../types";

const AddonsTab = () => {
  const [uploadingAddon, setUploadingAddon] = useState(false);
  
  // Updated addon types to match our new type definition
  const installedAddons: AddonModule[] = [
    { 
      id: 1, 
      name: "Blood Matching Algorithm", 
      version: "1.0.0", 
      status: "Active",
      author: "Internal Team",
      description: "Blood type matching engine",
      hasSettings: true
    },
    { 
      id: 2, 
      name: "Donor Eligibility Check", 
      version: "1.1.0", 
      status: "Active",
      author: "Internal Team",
      description: "Donor eligibility verification",
      hasSettings: true
    },
    { 
      id: 3, 
      name: "Donation Inventory", 
      version: "1.0.2", 
      status: "Inactive",
      author: "Internal Team",
      description: "Inventory tracking system",
      hasSettings: false
    },
  ];
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Install New Addon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload addon modules to extend system functionality.
              Addons should be in the .zip format.
            </p>
            
            <AddonUploader 
              uploadingAddon={uploadingAddon}
              setUploadingAddon={setUploadingAddon}
            />
            
            <Alert className="bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription>
                Only install addons from trusted sources. Malicious addons can compromise your system security.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Installed Addons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {installedAddons.map(addon => (
              <div key={addon.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Box className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{addon.name}</p>
                    <p className="text-xs text-muted-foreground">Version {addon.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    addon.status === "Active" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                    {addon.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Cog className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddonsTab;
