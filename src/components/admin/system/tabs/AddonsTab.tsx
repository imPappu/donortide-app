
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddonUploader from "../components/AddonUploader";

interface InstalledAddon {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive" | "Needs Update";
}

interface AddonsTabProps {
  uploadingAddon: boolean;
  handleUploadAddon: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  installedAddons: InstalledAddon[];
}

const AddonsTab = ({ uploadingAddon, handleUploadAddon, installedAddons }: AddonsTabProps) => {
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
