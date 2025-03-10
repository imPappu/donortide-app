
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, AlertTriangle } from "lucide-react";

interface AddonUploaderProps {
  uploadingAddon: boolean;
  handleUploadAddon: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const AddonUploader = ({ uploadingAddon, handleUploadAddon }: AddonUploaderProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload addon modules to extend system functionality.
        Addons should be in the .zip format.
      </p>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
        <Upload className="h-8 w-8 mx-auto text-gray-400" />
        <p className="mt-2 text-sm font-medium">Drag and drop addon file here, or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground">Supports .zip addon packages</p>
        
        <div className="mt-4">
          <label className="relative">
            <input
              type="file"
              accept=".zip"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUploadAddon}
              disabled={uploadingAddon}
            />
            <Button 
              variant="outline" 
              className="w-full"
              disabled={uploadingAddon}
            >
              {uploadingAddon ? "Installing..." : "Browse Files"}
            </Button>
          </label>
        </div>
      </div>
      
      <Alert className="bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription>
          Only install addons from trusted sources. Malicious addons can compromise your system security.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AddonUploader;
