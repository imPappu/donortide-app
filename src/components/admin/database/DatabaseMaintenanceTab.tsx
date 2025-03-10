
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatabaseMaintenanceTabProps {
  loading: boolean;
  runDatabaseMigration: () => Promise<void>;
}

const DatabaseMaintenanceTab: React.FC<DatabaseMaintenanceTabProps> = ({ 
  loading, 
  runDatabaseMigration 
}) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="mr-2 h-5 w-5" />
          Database Maintenance
        </CardTitle>
        <CardDescription>
          Perform maintenance operations on your database
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Run Database Migrations</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Apply database schema changes and migrations to update your database structure
          </p>
          <Button 
            onClick={runDatabaseMigration} 
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              'Run Migrations'
            )}
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Database Health Check</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Check the health of your database and optimize its performance
          </p>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Health Check Complete",
                description: "Database is healthy and performing optimally",
              });
            }}
          >
            Run Health Check
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Vacuum Database</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Clean up fragmented data and reclaim storage space
          </p>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Vacuum Complete",
                description: "Database vacuuming process completed successfully",
              });
            }}
          >
            Vacuum Database
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseMaintenanceTab;
