
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

const MobileTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile App Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                <Smartphone className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">iOS App</h3>
                <p className="text-sm text-muted-foreground">Current version: 1.2.3</p>
                <p className="text-sm text-muted-foreground">Latest version: 1.2.5</p>
                <Button size="sm" className="mt-2">Push Update</Button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                <Smartphone className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Android App</h3>
                <p className="text-sm text-muted-foreground">Current version: 1.2.4</p>
                <p className="text-sm text-muted-foreground">Latest version: 1.2.5</p>
                <Button size="sm" className="mt-2">Push Update</Button>
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">Upload New App Version</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Platform</label>
                <select className="mt-1 w-full p-2 border rounded-md">
                  <option>iOS</option>
                  <option>Android</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Version Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1.2.6" 
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">App Bundle</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="app-bundle-upload"
                  />
                  <label 
                    htmlFor="app-bundle-upload"
                    className="cursor-pointer text-sm text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    Click to upload app bundle
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Upload & Publish</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default MobileTab;
