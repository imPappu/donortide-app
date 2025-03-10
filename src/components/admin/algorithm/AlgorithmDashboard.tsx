
import React from 'react';
import AlgorithmConfigPanel from './AlgorithmConfigPanel';
import AlgorithmPerformanceCard from './AlgorithmPerformanceCard';
import DonorLeaderboard from './DonorLeaderboard';
import RequestUrgencyCard from './RequestUrgencyCard';

const AlgorithmDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlgorithmPerformanceCard />
        <DonorLeaderboard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequestUrgencyCard />
        <AlgorithmConfigPanel />
      </div>
    </div>
  );
};

export default AlgorithmDashboard;
