
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Send, Settings, BarChart, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const FirebasePushComponent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("setup");
  
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig>({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  });

  const [notification, setNotification] = useState({
    title: "",
    body: "",
    target: "all", // all, topic, token
    topic: "",
    token: "",
    imageUrl: ""
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFirebaseConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNotification(prev => ({ ...prev, [name]: value }));
  };

  const saveFirebaseConfig = () => {
    // In a real app, we would save this to the database
    toast({
      title: "Success",
      description: "Firebase configuration saved successfully.",
    });
  };

  const sendPushNotification = () => {
    // Validate form
    if (!notification.title || !notification.body) {
      toast({
        title: "Error",
        description: "Title and body are required",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would send this to the backend
    toast({
      title: "Success",
      description: "Notification sent successfully.",
    });
  };

  const mockStatistics = {
    totalDevices: 1243,
    activeDevices: 876,
    androidDevices: 845,
    iosDevices: 398,
    deliveryRate: 98.2,
    openRate: 45.3
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flame className="mr-2 h-5 w-5 text-orange-500" />
          Firebase Push Notifications
        </CardTitle>
        <CardDescription>
          Configure and send push notifications to your users using Firebase Cloud Messaging
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="setup" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="send" className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              Send Notification
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input 
                    id="apiKey" 
                    name="apiKey" 
                    value={firebaseConfig.apiKey} 
                    onChange={handleConfigChange}
                    placeholder="Firebase API Key" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authDomain">Auth Domain</Label>
                  <Input 
                    id="authDomain" 
                    name="authDomain" 
                    value={firebaseConfig.authDomain} 
                    onChange={handleConfigChange}
                    placeholder="yourapp.firebaseapp.com" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectId">Project ID</Label>
                  <Input 
                    id="projectId" 
                    name="projectId" 
                    value={firebaseConfig.projectId} 
                    onChange={handleConfigChange}
                    placeholder="your-project-id" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageBucket">Storage Bucket</Label>
                  <Input 
                    id="storageBucket" 
                    name="storageBucket" 
                    value={firebaseConfig.storageBucket} 
                    onChange={handleConfigChange}
                    placeholder="your-project-id.appspot.com" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                  <Input 
                    id="messagingSenderId" 
                    name="messagingSenderId" 
                    value={firebaseConfig.messagingSenderId} 
                    onChange={handleConfigChange}
                    placeholder="123456789012" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appId">App ID</Label>
                  <Input 
                    id="appId" 
                    name="appId" 
                    value={firebaseConfig.appId} 
                    onChange={handleConfigChange}
                    placeholder="1:123456789012:web:abcd1234" 
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={saveFirebaseConfig}>Save Configuration</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="send">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={notification.title} 
                  onChange={handleNotificationChange}
                  placeholder="Enter notification title" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Notification Body</Label>
                <textarea 
                  id="body" 
                  name="body" 
                  value={notification.body} 
                  onChange={handleNotificationChange}
                  placeholder="Enter notification message"
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input 
                  id="imageUrl" 
                  name="imageUrl" 
                  value={notification.imageUrl} 
                  onChange={handleNotificationChange}
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target">Target Audience</Label>
                <select 
                  id="target" 
                  name="target" 
                  value={notification.target} 
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 rounded-md border border-input"
                >
                  <option value="all">All Users</option>
                  <option value="topic">Topic Subscribers</option>
                  <option value="token">Specific Device</option>
                </select>
              </div>
              
              {notification.target === "topic" && (
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic Name</Label>
                  <Input 
                    id="topic" 
                    name="topic" 
                    value={notification.topic} 
                    onChange={handleNotificationChange}
                    placeholder="Enter topic name (e.g., 'donors')" 
                  />
                </div>
              )}
              
              {notification.target === "token" && (
                <div className="space-y-2">
                  <Label htmlFor="token">Device Token</Label>
                  <Input 
                    id="token" 
                    name="token" 
                    value={notification.token} 
                    onChange={handleNotificationChange}
                    placeholder="Enter FCM device token" 
                  />
                </div>
              )}
              
              <div className="pt-4">
                <Button onClick={sendPushNotification} className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="text-2xl font-bold">{mockStatistics.totalDevices}</h3>
                    <p className="text-sm text-muted-foreground">Total Devices</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="text-2xl font-bold">{mockStatistics.activeDevices}</h3>
                    <p className="text-sm text-muted-foreground">Active Devices</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Send className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="text-2xl font-bold">{mockStatistics.deliveryRate}%</h3>
                    <p className="text-sm text-muted-foreground">Delivery Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Platform Distribution</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Android</span>
                  <span>{mockStatistics.androidDevices} devices</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(mockStatistics.androidDevices / mockStatistics.totalDevices) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span>iOS</span>
                  <span>{mockStatistics.iosDevices} devices</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(mockStatistics.iosDevices / mockStatistics.totalDevices) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FirebasePushComponent;
