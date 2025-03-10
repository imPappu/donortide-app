
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, Upload, Box, Smartphone, Globe, Cog, Layers, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemUpdatePanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("core");
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadingAddon, setUploadingAddon] = useState(false);
  
  const handleSystemUpdate = async () => {
    setUpdating(true);
    setProgress(0);
    
    // Simulate update process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(i);
    }
    
    toast({
      title: "Update Successful",
      description: "The system has been updated to the latest version.",
    });
    
    setUpdating(false);
  };
  
  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingAddon(true);
    const file = e.target.files[0];
    
    // Simulate upload and installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Addon Installed",
      description: `Successfully installed ${file.name}`,
    });
    
    setUploadingAddon(false);
  };
  
  const installedAddons = [
    { id: 1, name: "Payment Gateway Plus", version: "1.2.0", status: "Active" },
    { id: 2, name: "Analytics Dashboard", version: "2.0.1", status: "Active" },
    { id: 3, name: "Community Manager", version: "1.0.5", status: "Inactive" },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Management</h1>
        <p className="text-muted-foreground">Manage system updates and addon modules</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="core">Core System</TabsTrigger>
          <TabsTrigger value="addons">Addon Modules</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Updates</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core System Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-200">Update Available</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Version 2.5.0 is available (Current: 2.4.2)
                    </p>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium">What's new:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Enhanced security features</li>
                        <li>Improved performance and stability</li>
                        <li>New admin dashboard widgets</li>
                        <li>Bug fixes and minor improvements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {updating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Updating system...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSystemUpdate} 
                  disabled={updating}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {updating ? "Updating..." : "Update Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Current Version</p>
                  <p className="text-lg">2.4.2</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-lg">2023-10-15</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Database Version</p>
                  <p className="text-lg">1.8.3</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Server Environment</p>
                  <p className="text-lg">Production</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addons" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="mobile" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="website" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Website Version: 2.1.0
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your website is currently active and running the latest version.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domain Name</label>
                  <input 
                    type="text" 
                    value="https://yourblooddonation.com" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website Theme</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Default</option>
                    <option>Modern</option>
                    <option>Classic</option>
                    <option>Dark</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Website Modules</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Blog", "Testimonials", "Team", "Gallery", "FAQ", "Contact", "Donors", "Events"].map(module => (
                    <div key={module} className="flex items-center gap-2">
                      <input type="checkbox" id={`module-${module}`} checked={module !== "Team"} />
                      <label htmlFor={`module-${module}`} className="text-sm">{module}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Website Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Integration for Website</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect open-source AI models to enhance your website with intelligent features.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">DeepSeek AI</h3>
                      <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs px-2 py-1 rounded-full">Inactive</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Powerful AI model for content analysis and suggestion.</p>
                    <Button size="sm" variant="outline" className="w-full">Configure</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Qwen</h3>
                      <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Multilingual conversational AI for donor assistance.</p>
                    <Button size="sm" variant="outline" className="w-full">Configure</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">OpenAI Grok</h3>
                      <span className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 text-xs px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Advanced language model for community monitoring.</p>
                    <Button size="sm" variant="outline" className="w-full">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemUpdatePanel;
