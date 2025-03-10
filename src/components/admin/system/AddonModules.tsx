
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, AlertTriangle, Upload, RefreshCw, Component, Sliders, Settings, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddonModule {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Inactive" | "Needs Update";
  author: string;
  description: string;
  hasSettings: boolean;
}

const AddonModules = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("installed");
  const [uploadingAddon, setUploadingAddon] = useState(false);
  const [installingFromRepo, setInstallingFromRepo] = useState(false);
  
  const [installedAddons, setInstalledAddons] = useState<AddonModule[]>([
    { 
      id: 1, 
      name: "Payment Gateway Plus", 
      version: "1.2.0", 
      status: "Active",
      author: "DonorTide Team",
      description: "Extended payment gateway options including PayPal, Apple Pay and Google Pay.",
      hasSettings: true
    },
    { 
      id: 2, 
      name: "Analytics Dashboard", 
      version: "2.0.1", 
      status: "Active",
      author: "Data Insights Ltd",
      description: "Advanced analytics dashboard with custom report generation.",
      hasSettings: true
    },
    { 
      id: 3, 
      name: "Community Manager", 
      version: "1.0.5", 
      status: "Inactive",
      author: "Social Connect",
      description: "Enhanced community management tools with moderation features.",
      hasSettings: false
    },
  ]);
  
  const repositoryAddons = [
    { 
      id: 101, 
      name: "Donor CRM", 
      version: "3.1.2", 
      author: "CRM Solutions",
      description: "Complete donor relationship management tools.",
      installed: false
    },
    { 
      id: 102, 
      name: "Event Manager", 
      version: "2.0.0", 
      author: "Event Tech",
      description: "Blood donation event planning and management tools.",
      installed: false
    },
    { 
      id: 103, 
      name: "Email Campaign", 
      version: "1.5.3", 
      author: "Email Marketing Pro",
      description: "Create, schedule and track email campaigns to donors.",
      installed: false
    },
  ];

  const handleUploadAddon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingAddon(true);
    const file = e.target.files[0];
    
    // Simulate upload and installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAddon: AddonModule = {
      id: installedAddons.length + 10,
      name: file.name.replace(/\.(zip|addon)$/, ""),
      version: "1.0.0",
      status: "Inactive",
      author: "Custom Upload",
      description: "Manually uploaded addon module.",
      hasSettings: false
    };
    
    setInstalledAddons(prev => [...prev, newAddon]);
    
    toast({
      title: "Addon Installed",
      description: `Successfully installed ${file.name}`,
    });
    
    setUploadingAddon(false);
    setActiveTab("installed");
  };
  
  const toggleAddonStatus = (id: number) => {
    setInstalledAddons(prev => prev.map(addon => {
      if (addon.id === id) {
        const newStatus = addon.status === "Active" ? "Inactive" : "Active";
        toast({
          title: newStatus === "Active" ? "Addon Activated" : "Addon Deactivated",
          description: `${addon.name} has been ${newStatus === "Active" ? "activated" : "deactivated"}.`,
        });
        return { ...addon, status: newStatus };
      }
      return addon;
    }));
  };
  
  const installFromRepository = async (id: number, name: string) => {
    setInstallingFromRepo(true);
    
    // Simulate installation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newAddon: AddonModule = {
      id: installedAddons.length + 20,
      name,
      version: repositoryAddons.find(a => a.id === id)?.version || "1.0.0",
      status: "Inactive",
      author: repositoryAddons.find(a => a.id === id)?.author || "Unknown",
      description: repositoryAddons.find(a => a.id === id)?.description || "",
      hasSettings: false
    };
    
    setInstalledAddons(prev => [...prev, newAddon]);
    
    toast({
      title: "Addon Installed",
      description: `Successfully installed ${name} from repository`,
    });
    
    setInstallingFromRepo(false);
    setActiveTab("installed");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Component className="mr-2 h-5 w-5 text-primary" />
            Addon Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="installed">Installed</TabsTrigger>
              <TabsTrigger value="repository">Repository</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="installed" className="space-y-4">
              {installedAddons.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <h3 className="font-medium">No Addons Installed</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Browse the repository or upload a new addon
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {installedAddons.map(addon => (
                    <div key={addon.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/30 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{addon.name}</h3>
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">v{addon.version}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">By {addon.author}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              addon.status === "Active" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                                : addon.status === "Needs Update"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}>
                              {addon.status}
                            </span>
                            <Switch 
                              checked={addon.status === "Active"} 
                              onCheckedChange={() => toggleAddonStatus(addon.id)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm">{addon.description}</p>
                        <div className="flex justify-end gap-2 mt-3">
                          {addon.hasSettings && (
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Settings
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4 mr-1" />
                            Permissions
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="repository" className="space-y-4">
              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  Browse verified addon modules from our official repository. 
                  All modules are scanned for security and compatibility.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                {repositoryAddons.map(addon => (
                  <div key={addon.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{addon.name}</h3>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">v{addon.version}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">By {addon.author}</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => installFromRepository(addon.id, addon.name)}
                          disabled={installingFromRepo}
                        >
                          {installingFromRepo ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                              Installing...
                            </>
                          ) : (
                            "Install"
                          )}
                        </Button>
                      </div>
                      <p className="text-sm mt-2">{addon.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  Only install addons from trusted sources. Malicious addons can compromise your system security.
                </AlertDescription>
              </Alert>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm font-medium">Drag and drop addon file here, or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">Supports .zip and .addon packages</p>
                
                <div className="mt-4">
                  <label className="relative">
                    <input
                      type="file"
                      accept=".zip,.addon"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleUploadAddon}
                      disabled={uploadingAddon}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={uploadingAddon}
                    >
                      {uploadingAddon ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Installing...
                        </>
                      ) : (
                        "Browse Files"
                      )}
                    </Button>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sliders className="mr-2 h-5 w-5 text-primary" />
            Module Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Configure global settings for how addon modules operate in your system.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Updates</h3>
                    <p className="text-sm text-muted-foreground">Automatically update modules when new versions are available</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Compatibility Check</h3>
                    <p className="text-sm text-muted-foreground">Run compatibility checks before installing modules</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Development Mode</h3>
                    <p className="text-sm text-muted-foreground">Enable development tools for custom module creation</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Security Scanning</h3>
                    <p className="text-sm text-muted-foreground">Scan uploaded modules for security vulnerabilities</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-2">
              <Button>Save Module Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddonModules;
