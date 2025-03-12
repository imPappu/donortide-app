
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Download, Copy, Server, Database, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstallationGuide = () => {
  const { toast } = useToast();
  
  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Copied to clipboard",
      description: "Command copied successfully",
    });
  };
  
  const openInstallationGuide = () => {
    window.open('/installation-guide.html', '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">cPanel Installation Guide</CardTitle>
          <CardDescription>
            Follow these steps to deploy the Blood Donation System on your cPanel hosting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 dark:bg-amber-900/20 dark:border-amber-800">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 dark:text-amber-500" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-500">Important</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Before deploying to cPanel, make sure you have the latest build of your application.
                </p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="quick-steps">
            <TabsList className="w-full">
              <TabsTrigger value="quick-steps">Quick Steps</TabsTrigger>
              <TabsTrigger value="detailed-guide">Detailed Guide</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quick-steps" className="mt-4 space-y-4">
              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <strong>Build your application</strong>
                  <div className="bg-slate-100 p-2 rounded mt-2 flex justify-between items-center dark:bg-slate-800">
                    <code className="text-sm">npm run build</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleCopyCommand('npm run build')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
                
                <li>
                  <strong>Upload files to cPanel</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload the <code>build</code> folder contents and backend files to your cPanel public_html directory
                  </p>
                </li>
                
                <li>
                  <strong>Configure database</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a PostgreSQL or MySQL database in cPanel and update connection details
                  </p>
                </li>
                
                <li>
                  <strong>Run installation wizard</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visit <code>https://your-domain.com/install</code> to run the installation wizard
                  </p>
                </li>
                
                <li>
                  <strong>Set file permissions and security</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set proper permissions and remove installation files after setup
                  </p>
                </li>
              </ol>
              
              <Button className="w-full mt-6" onClick={openInstallationGuide}>
                <FileCode className="mr-2 h-4 w-4" />
                Open Full Installation Guide
              </Button>
            </TabsContent>
            
            <TabsContent value="detailed-guide" className="mt-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Server className="h-5 w-5 mr-3 mt-1 text-blue-500" />
                  <div>
                    <h3 className="font-medium mb-1">cPanel Server Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>PHP 7.4 or higher</li>
                      <li>PostgreSQL 12+ or MySQL 5.7+</li>
                      <li>Apache with mod_rewrite enabled</li>
                      <li>SSL certificate (recommended)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Database className="h-5 w-5 mr-3 mt-1 text-blue-500" />
                  <div>
                    <h3 className="font-medium mb-1">Database Setup</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Login to cPanel and navigate to "PostgreSQL Databases" or "MySQL Databases"</li>
                      <li>Create a new database (e.g., blood_donation_db)</li>
                      <li>Create a database user with a strong password</li>
                      <li>Add the user to the database with "All Privileges"</li>
                      <li>Update the database connection details in backend files</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileCode className="h-5 w-5 mr-3 mt-1 text-blue-500" />
                  <div>
                    <h3 className="font-medium mb-1">.htaccess Configuration</h3>
                    <p className="text-sm mb-2">Create an .htaccess file in your public_html directory with the following content:</p>
                    <div className="bg-slate-100 p-2 rounded mt-2 dark:bg-slate-800">
                      <code className="text-xs whitespace-pre-wrap">
{`# Handle React routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>`}
                      </code>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => handleCopyCommand(`# Handle React routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>`)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      <span className="text-xs">Copy .htaccess</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={openInstallationGuide}>
                <FileCode className="mr-2 h-4 w-4" />
                Open Full Installation Guide
              </Button>
            </TabsContent>
            
            <TabsContent value="troubleshooting" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="bg-slate-100 p-4 rounded dark:bg-slate-800">
                  <h3 className="font-medium mb-2">Database Connection Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're having trouble connecting to the database, check:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                    <li>Database credentials are correct in both backend files</li>
                    <li>The database user has sufficient permissions</li>
                    <li>Remote connections are allowed (if your database is on a different server)</li>
                    <li>PHP PDO extensions are enabled for your database type</li>
                  </ul>
                </div>
                
                <div className="bg-slate-100 p-4 rounded dark:bg-slate-800">
                  <h3 className="font-medium mb-2">Page Not Found / Routing Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    If you see 404 errors when navigating the app:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                    <li>Ensure the .htaccess file is properly configured</li>
                    <li>Check that mod_rewrite is enabled in Apache</li>
                    <li>Verify that AllowOverride is set to All in your Apache configuration</li>
                  </ul>
                </div>
                
                <div className="bg-slate-100 p-4 rounded dark:bg-slate-800">
                  <h3 className="font-medium mb-2">API Connection Failures</h3>
                  <p className="text-sm text-muted-foreground">
                    If the frontend can't connect to the backend:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                    <li>Verify API_BASE_URL points to your correct domain</li>
                    <li>Check for CORS issues in browser console</li>
                    <li>Ensure backend files (api.php) are properly uploaded and accessible</li>
                    <li>Test API endpoints directly using a tool like Postman</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationGuide;
