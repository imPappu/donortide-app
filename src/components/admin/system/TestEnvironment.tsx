
import React from "react";
import { useTestEnvironment } from "@/hooks/useTestEnvironment";
import TestModeCard from "./test/TestModeCard";
import TestConfigSettings from "./test/TestConfigSettings";
import EnvironmentInfo from "./test/EnvironmentInfo";

const TestEnvironment = () => {
  const {
    testModeEnabled,
    testingInProgress,
    mockDataEnabled,
    testEndpoints,
    toggleTestMode,
    setMockDataEnabled,
    handleEndpointToggle,
    runTestSuite
  } = useTestEnvironment();

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
      
      <EnvironmentInfo testModeEnabled={testModeEnabled} />
    </div>
  );
};

export default TestEnvironment;
