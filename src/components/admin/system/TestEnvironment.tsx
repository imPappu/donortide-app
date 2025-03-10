
import React from "react";
import { useTestEnvironment } from "@/hooks/useTestEnvironment";
import TestModeCard from "./test/TestModeCard";
import TestConfigSettings from "./test/TestConfigSettings";
import EnvironmentInfo from "./test/EnvironmentInfo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const TestEnvironment = () => {
  const { isAdmin } = useAuth();
  const {
    testModeEnabled,
    testingInProgress,
    mockDataEnabled,
    testEndpoints,
    testResults,
    toggleTestMode,
    setMockDataEnabled,
    handleEndpointToggle,
    runTestSuite
  } = useTestEnvironment();

  if (!isAdmin) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access the test environment. Please contact an administrator.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <TestModeCard 
        testModeEnabled={testModeEnabled}
        toggleTestMode={toggleTestMode}
      />
      
      <TestConfigSettings 
        testingInProgress={testingInProgress}
        mockDataEnabled={mockDataEnabled}
        testEndpoints={testEndpoints}
        setMockDataEnabled={setMockDataEnabled}
        handleEndpointToggle={handleEndpointToggle}
        runTestSuite={runTestSuite}
      />
      
      <EnvironmentInfo 
        testModeEnabled={testModeEnabled} 
        testResults={testResults}
      />
    </div>
  );
};

export default TestEnvironment;
