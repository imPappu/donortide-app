
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const WebsiteTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default WebsiteTab;
