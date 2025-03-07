
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, Database, ShieldCheck, Server, AlertTriangle,
  Settings, UserPlus
} from "lucide-react";
import { 
  installSystem, 
  testDatabaseConnection, 
  createAdminUser,
  AppSetting
} from "@/services/dbService";

interface InstallStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

const Install = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("welcome");
  const [loading, setLoading] = useState(false);
  
  // Database configuration
  const [dbHost, setDbHost] = useState("localhost");
  const [dbName, setDbName] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [dbConnectionStatus, setDbConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  
  // Admin user
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  
  // App settings
  const [appName, setAppName] = useState("Blood Donation System");
  const [adminPath, setAdminPath] = useState("admin");

  // Installation steps
  const [steps, setSteps] = useState<InstallStep[]>([
    { id: "welcome", title: "Welcome", icon: <CheckCircle2 className="h-5 w-5" />, completed: true },
    { id: "database", title: "Database", icon: <Database className="h-5 w-5" />, completed: false },
    { id: "admin", title: "Admin User", icon: <UserPlus className="h-5 w-5" />, completed: false },
    { id: "settings", title: "Settings", icon: <Settings className="h-5 w-5" />, completed: false },
    { id: "finish", title: "Finish", icon: <ShieldCheck className="h-5 w-5" />, completed: false },
  ]);

  const updateStepCompletion = (stepId: string, isCompleted: boolean) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: isCompleted } : step
    ));
  };

  const handleDatabaseTest = async () => {
    if (!dbHost || !dbName || !dbUser) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required database fields",
        variant: "destructive",
      });
      return;
    }

    setDbConnectionStatus("testing");
    
    try {
      const connected = await testDatabaseConnection({
        host: dbHost,
        database: dbName,
        user: dbUser,
        password: dbPassword
      });
      
      if (connected) {
        setDbConnectionStatus("success");
        updateStepCompletion("database", true);
        toast({
          title: "Database connection successful",
          description: "Successfully connected to the database",
        });
      } else {
        setDbConnectionStatus("error");
        toast({
          title: "Connection failed",
          description: "Could not connect to the database with the provided details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Database connection error:", error);
      setDbConnectionStatus("error");
      toast({
        title: "Connection error",
        description: "An error occurred while testing the database connection",
        variant: "destructive",
      });
    }
  };

  const handleCreateAdmin = () => {
    if (!adminUsername || !adminEmail || !adminPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required admin user fields",
        variant: "destructive",
      });
      return;
    }

    if (adminPassword !== adminConfirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would validate and store the admin credentials
    updateStepCompletion("admin", true);
    toast({
      title: "Admin user ready",
      description: "Admin user configuration is valid",
    });
  };

  const handleSettingsSave = () => {
    if (!appName || !adminPath) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required settings fields",
        variant: "destructive",
      });
      return;
    }

    updateStepCompletion("settings", true);
    toast({
      title: "Settings saved",
      description: "Application settings have been configured",
    });
  };

  const handleInstallSystem = async () => {
    if (!steps.find(step => step.id === "database")?.completed ||
        !steps.find(step => step.id === "admin")?.completed ||
        !steps.find(step => step.id === "settings")?.completed) {
      toast({
        title: "Incomplete setup",
        description: "Please complete all previous steps before finishing the installation",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare database config
      const dbConfig = {
        host: dbHost,
        database: dbName,
        user: dbUser,
        password: dbPassword
      };

      // Prepare admin user
      const adminUser = {
        username: adminUsername,
        email: adminEmail,
        password: adminPassword
      };

      // Prepare app settings
      const appSettings: AppSetting[] = [
        { settingKey: 'app_name', settingValue: appName, description: 'Application name' },
        { settingKey: 'admin_url_path', settingValue: adminPath, description: 'Admin dashboard URL path' },
        { settingKey: 'app_installed', settingValue: 'true', description: 'Installation status' }
      ];

      // Call the installation API
      const installed = await installSystem(dbConfig, adminUser, appSettings);
      
      if (installed) {
        updateStepCompletion("finish", true);
        toast({
          title: "Installation complete",
          description: "Your blood donation system has been successfully installed",
        });
        
        // Create the admin user
        await createAdminUser(adminUser);
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast({
          title: "Installation failed",
          description: "There was a problem installing the system",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Installation error:", error);
      toast({
        title: "Installation error",
        description: "An error occurred during the installation process",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Blood Donation System</h1>
          <p className="text-muted-foreground">Installation Wizard</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>System Installation</CardTitle>
              <div className="flex gap-2">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center ${activeTab === step.id ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {index > 0 && <div className="h-px w-4 bg-gray-300 dark:bg-gray-700 mx-1" />}
                    <div 
                      className={`flex items-center justify-center h-8 w-8 rounded-full text-sm
                        ${step.completed 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : activeTab === step.id 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="hidden">
                {steps.map(step => (
                  <TabsTrigger key={step.id} value={step.id}>{step.title}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="welcome" className="space-y-4">
                <div className="text-center py-6">
                  <Server className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Welcome to Blood Donation System</h2>
                  <p className="mb-4 text-muted-foreground max-w-md mx-auto">
                    This wizard will guide you through the installation process.
                    You'll set up your database, create an admin user, and configure basic settings.
                  </p>
                  
                  <Alert className="my-4 max-w-md mx-auto">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Make sure you have a PostgreSQL database ready before proceeding.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
              
              <TabsContent value="database" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Database Configuration</h2>
                <p className="mb-4 text-muted-foreground">
                  Enter your PostgreSQL database details to connect to your database server.
                </p>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Host</Label>
                      <Input 
                        id="db-host" 
                        placeholder="localhost" 
                        value={dbHost}
                        onChange={(e) => setDbHost(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input 
                        id="db-name" 
                        placeholder="blood_donation" 
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Username</Label>
                      <Input 
                        id="db-user" 
                        placeholder="postgres" 
                        value={dbUser}
                        onChange={(e) => setDbUser(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Password</Label>
                      <Input 
                        id="db-password" 
                        type="password" 
                        placeholder="••••••••"
                        value={dbPassword}
                        onChange={(e) => setDbPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleDatabaseTest} 
                    variant="secondary"
                    className="mr-2"
                    disabled={dbConnectionStatus === "testing"}
                  >
                    {dbConnectionStatus === "testing" ? "Testing..." : "Test Connection"}
                  </Button>
                </div>
                
                {dbConnectionStatus === "success" && (
                  <Alert className="bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-700 dark:text-green-300" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      Successfully connected to the database.
                    </AlertDescription>
                  </Alert>
                )}
                
                {dbConnectionStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to connect to the database. Please check your credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Admin User Creation</h2>
                <p className="mb-4 text-muted-foreground">
                  Create an administrator account to manage your blood donation system.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-username">Username</Label>
                      <Input 
                        id="admin-username" 
                        placeholder="admin" 
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        placeholder="admin@example.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input 
                        id="admin-password" 
                        type="password" 
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-confirm-password">Confirm Password</Label>
                      <Input 
                        id="admin-confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                        value={adminConfirmPassword}
                        onChange={(e) => setAdminConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleCreateAdmin} 
                    variant="secondary"
                  >
                    Validate Admin
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
                <p className="mb-4 text-muted-foreground">
                  Configure basic settings for your blood donation system.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input 
                      id="app-name" 
                      placeholder="Blood Donation System" 
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-path">Admin URL Path</Label>
                    <Input 
                      id="admin-path" 
                      placeholder="admin" 
                      value={adminPath}
                      onChange={(e) => setAdminPath(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      This will be the URL path to access your admin dashboard (e.g., yourdomain.com/{adminPath})
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleSettingsSave} 
                    variant="secondary"
                  >
                    Save Settings
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="finish" className="space-y-4">
                <div className="text-center py-6">
                  <CheckCircle2 className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Ready to Install</h2>
                  <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                    All configuration is complete. Click the button below to install your blood donation system.
                  </p>
                  
                  <Button 
                    onClick={handleInstallSystem}
                    className="px-8" 
                    disabled={loading}
                  >
                    {loading ? "Installing..." : "Complete Installation"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              disabled={activeTab === "welcome"}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={activeTab === "finish" || (
                // Don't allow moving to the next step if the current step is not completed
                (activeTab === "database" && !steps.find(s => s.id === "database")?.completed) ||
                (activeTab === "admin" && !steps.find(s => s.id === "admin")?.completed) ||
                (activeTab === "settings" && !steps.find(s => s.id === "settings")?.completed)
              )}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Install;
