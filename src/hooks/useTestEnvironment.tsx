
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useTestEnvironment() {
  const { toast } = useToast();
  const [testModeEnabled, setTestModeEnabled] = useState(false);
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [mockDataEnabled, setMockDataEnabled] = useState(true);
  const [testEndpoints, setTestEndpoints] = useState({
    api: true,
    database: true,
    auth: true,
    payment: false
  });

  const toggleTestMode = () => {
    const newStatus = !testModeEnabled;
    setTestModeEnabled(newStatus);
    toast({
      title: newStatus ? "Test Mode Enabled" : "Test Mode Disabled",
      description: newStatus 
        ? "System is now running in test mode. No real data will be affected." 
        : "System is now running in production mode.",
    });
  };

  const runTestSuite = async () => {
    setTestingInProgress(true);
    
    // Simulate test process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTestingInProgress(false);
    toast({
      title: "Tests Completed",
      description: "All test suites passed successfully.",
    });
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
    toggleTestMode,
    setMockDataEnabled,
    handleEndpointToggle,
    runTestSuite
  };
}
