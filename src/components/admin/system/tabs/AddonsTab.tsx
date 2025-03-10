
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Box, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddonProps {
  uploadingAddon: boolean;
  handleUploadAddon: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  installedAddons: Array<{
    id: number;
    name: string;
    version: string;
    status: string;
  }>;
}

const AddonsTab = ({ uploadingAddon, handleUploadAddon, installedAddons }: AddonProps) => {
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
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <label className="relative block cursor-pointer">
                <input
                  type="file"
                  accept=".zip"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleUploadAddon}
                  disabled={uploadingAddon}
                />
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Drag and drop addon file here, or click to browse</p>
                  <p className="mt-1 text-xs text-muted-foreground">Supports .zip addon packages</p>
                </div>
              </label>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={uploadingAddon}
                >
                  {uploadingAddon ? "Installing..." : "Browse Files"}
                </Button>
              </div>
            </div>
            
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
