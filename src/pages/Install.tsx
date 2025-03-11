
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { checkConnection, setupDatabase, installApp } from '@/services/installService';
import { useToast } from '@/hooks/use-toast';
import { AppSetting, DatabaseConfig, AdminUser } from '@/types/apiTypes';

const Install = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // DB config state
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
    host: 'localhost',
    name: 'bloodmate',
    user: 'root',
    password: '',
    port: '3306',
    type: 'mysql',
  });
  
  // Admin account state
  const [adminAccount, setAdminAccount] = useState<AdminUser>({
    username: 'admin',
    email: '',
    password: '',
  });
  
  // App settings state
  const [appSettings, setAppSettings] = useState<Partial<AppSetting>[]>([
    { settingKey: 'app_name', settingValue: 'BloodMate' },
    { settingKey: 'app_description', settingValue: 'Blood Donation Management System' },
    { settingKey: 'primary_color', settingValue: '#ef4444' },
    { settingKey: 'enable_pwa', settingValue: 'true' },
    { settingKey: 'enable_notifications', settingValue: 'true' },
  ]);
  
  const handleDbConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig({
      ...dbConfig,
      [name]: value,
    });
  };
  
  const handleAdminAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminAccount({
      ...adminAccount,
      [name]: value,
    });
  };
  
  const handleSettingChange = (key: string, value: string) => {
    setAppSettings(appSettings.map(setting => 
      setting.settingKey === key ? { ...setting, settingValue: value } : setting
    ));
  };

  const validateDbConfig = () => {
    if (!dbConfig.host.trim() || !dbConfig.name.trim() || !dbConfig.user.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required database fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateAdminAccount = () => {
    if (!adminAccount.email.trim() || !adminAccount.password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required admin account fields",
        variant: "destructive",
      });
      return false;
    }
    
    if (adminAccount.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return false;
    }
    
    if (!adminAccount.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleTestConnection = async () => {
    if (!validateDbConfig()) return;
    
    setIsSubmitting(true);
    
    try {
      const isConnected = await checkConnection(dbConfig);
      
      if (isConnected) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to the database",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to the database with the provided details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSetupDatabase = async () => {
    if (!validateDbConfig()) return;
    
    setIsSubmitting(true);
    
    try {
      const isSetup = await setupDatabase(dbConfig);
      
      if (isSetup) {
        toast({
          title: "Setup Successful",
          description: "Database has been set up successfully",
        });
        setActiveStep(2);
        setProgress(33);
      } else {
        toast({
          title: "Setup Failed",
          description: "Could not set up the database",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error setting up database:", error);
      toast({
        title: "Setup Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFinishInstallation = async () => {
    if (!validateAdminAccount()) return;
    
    setIsSubmitting(true);
    
    try {
      const isInstalled = await installApp(dbConfig, adminAccount, appSettings);
      
      if (isInstalled) {
        toast({
          title: "Installation Complete",
          description: "BloodMate has been successfully installed",
        });
        setProgress(100);
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        toast({
          title: "Installation Failed",
          description: "Could not complete the installation",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during installation:", error);
      toast({
        title: "Installation Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleContinue = () => {
    if (activeStep === 1) {
      handleSetupDatabase();
    } else if (activeStep === 2) {
      setActiveStep(3);
      setProgress(66);
    } else if (activeStep === 3) {
      handleFinishInstallation();
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            BloodMate Installation
          </CardTitle>
          <CardDescription className="text-center">
            Set up your BloodMate application
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent>
          <Tabs value={`step-${activeStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled={activeStep !== 1}>Database</TabsTrigger>
              <TabsTrigger value="step-2" disabled={activeStep !== 2}>Admin Account</TabsTrigger>
              <TabsTrigger value="step-3" disabled={activeStep !== 3}>App Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="step-1" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="host">Database Host</Label>
                <Input
                  id="host"
                  name="host"
                  value={dbConfig.host}
                  onChange={handleDbConfigChange}
                  placeholder="localhost"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Database Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={dbConfig.name}
                  onChange={handleDbConfigChange}
                  placeholder="bloodmate"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user">Database User</Label>
                <Input
                  id="user"
                  name="user"
                  value={dbConfig.user}
                  onChange={handleDbConfigChange}
                  placeholder="root"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Database Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={dbConfig.password}
                  onChange={handleDbConfigChange}
                  placeholder="Enter database password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Database Port (Optional)</Label>
                <Input
                  id="port"
                  name="port"
                  value={dbConfig.port}
                  onChange={handleDbConfigChange}
                  placeholder="3306"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleTestConnection}
                disabled={isSubmitting}
                className="w-full"
              >
                Test Connection
              </Button>
            </TabsContent>
            
            <TabsContent value="step-2" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Admin Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={adminAccount.username}
                  onChange={handleAdminAccountChange}
                  placeholder="admin"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={adminAccount.email}
                  onChange={handleAdminAccountChange}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin Password</Label>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  value={adminAccount.password}
                  onChange={handleAdminAccountChange}
                  placeholder="Enter a secure password"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="step-3" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="app_name">Application Name</Label>
                <Input
                  id="app_name"
                  value={appSettings.find(s => s.settingKey === 'app_name')?.settingValue || ''}
                  onChange={(e) => handleSettingChange('app_name', e.target.value)}
                  placeholder="BloodMate"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app_description">Application Description</Label>
                <Input
                  id="app_description"
                  value={appSettings.find(s => s.settingKey === 'app_description')?.settingValue || ''}
                  onChange={(e) => handleSettingChange('app_description', e.target.value)}
                  placeholder="Blood Donation Management System"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary_color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary_color"
                    type="color"
                    className="w-16 h-10 p-1"
                    value={appSettings.find(s => s.settingKey === 'primary_color')?.settingValue || '#ef4444'}
                    onChange={(e) => handleSettingChange('primary_color', e.target.value)}
                  />
                  <Input
                    value={appSettings.find(s => s.settingKey === 'primary_color')?.settingValue || '#ef4444'}
                    onChange={(e) => handleSettingChange('primary_color', e.target.value)}
                    placeholder="#ef4444"
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (activeStep > 1) {
                setActiveStep(activeStep - 1);
                setProgress(((activeStep - 2) / 3) * 100);
              }
            }}
            disabled={activeStep === 1 || isSubmitting}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Processing..." 
              : activeStep === 3 
                ? "Finish Installation" 
                : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Install;
