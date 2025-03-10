
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";

export function useTestEnvironment() {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [testModeEnabled, setTestModeEnabled] = useState(false);
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [mockDataEnabled, setMockDataEnabled] = useState(true);
  const [testEndpoints, setTestEndpoints] = useState({
    api: true,
    database: true,
    auth: true,
    payment: false
  });
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    skipped: number;
  }>({
    passed: 0,
    failed: 0,
    skipped: 0
  });

  // Ensure only admins can access test environment
  useEffect(() => {
    if (!isAdmin && testModeEnabled) {
      setTestModeEnabled(false);
      toast({
        title: "Access Denied",
        description: "You don't have permission to use the test environment",
        variant: "destructive",
      });
    }
  }, [isAdmin, testModeEnabled, toast]);

  const toggleTestMode = () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can toggle test mode",
        variant: "destructive",
      });
      return;
    }
    
    const newStatus = !testModeEnabled;
    setTestModeEnabled(newStatus);
    
    // Log the action for audit purposes
    console.log(`Test mode ${newStatus ? 'enabled' : 'disabled'} by admin`);
    
    toast({
      title: newStatus ? "Test Mode Enabled" : "Test Mode Disabled",
      description: newStatus 
        ? "System is now running in test mode. No real data will be affected." 
        : "System is now running in production mode.",
    });
  };

  const runTestSuite = async () => {
    if (!testModeEnabled) {
      toast({
        title: "Test Mode Required",
        description: "Please enable test mode before running tests",
        variant: "destructive",
      });
      return;
    }
    
    setTestingInProgress(true);
    
    try {
      // Simulate test process with different endpoints
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock test results
      const results = {
        passed: Math.floor(Math.random() * 15) + 10,
        failed: Math.floor(Math.random() * 3),
        skipped: Math.floor(Math.random() * 5)
      };
      
      setTestResults(results);
      
      if (results.failed > 0) {
        toast({
          title: "Tests Completed with Issues",
          description: `${results.passed} passed, ${results.failed} failed, ${results.skipped} skipped`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Tests Completed Successfully",
          description: `All ${results.passed} tests passed, ${results.skipped} skipped`,
        });
      }
    } catch (error) {
      console.error("Test suite error:", error);
      toast({
        title: "Test Suite Error",
        description: "An error occurred while running tests",
        variant: "destructive",
      });
    } finally {
      setTestingInProgress(false);
    }
  };

  const handleEndpointToggle = (endpoint: keyof typeof testEndpoints) => {
    setTestEndpoints(prev => ({
      ...prev,
      [endpoint]: !prev[endpoint]
    }));
  };

  return {
    testModeEnabled,
    testingInProgress,
    mockDataEnabled,
    testEndpoints,
    testResults,
    toggleTestMode,
    setMockDataEnabled,
    handleEndpointToggle,
    runTestSuite
  };
}
