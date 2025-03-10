
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Box, AlertTriangle, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddonUploader from "../components/AddonUploader";

interface InstalledAddon {
  id: number;
  name: string;
  version: string;
  status: string;
}

const AddonsTab = () => {
  const [uploadingAddon, setUploadingAddon] = useState(false);
  
  const installedAddons: InstalledAddon[] = [
    { id: 1, name: "Payment Gateway Plus", version: "1.2.0", status: "Active" },
    { id: 2, name: "Analytics Dashboard", version: "2.0.1", status: "Active" },
    { id: 3, name: "Community Manager", version: "1.0.5", status: "Inactive" },
  ];
  
  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingAddon(true);
    
    // Simulate upload and installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset uploading state
    setUploadingAddon(false);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Install New Addon</CardTitle>
        </CardHeader>
        <CardContent>
          <AddonUploader 
            uploadingAddon={uploadingAddon}
            handleUploadAddon={handleUploadAddon}
          />
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
