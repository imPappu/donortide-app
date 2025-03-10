
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAlgorithmPerformance } from '@/services/algorithmService';
import { AlgorithmPerformanceMetrics } from '@/types/algorithmTypes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ActivityIcon, TrendingUp, CheckCircle2, Clock, BarChartIcon, Loader2 } from 'lucide-react';

const AlgorithmPerformanceCard = () => {
  const [performance, setPerformance] = useState<AlgorithmPerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPerformance();
  }, []);

  const loadPerformance = async () => {
    setIsLoading(true);
    try {
      const data = await getAlgorithmPerformance();
      setPerformance(data);
    } catch (error) {
      console.error("Error loading algorithm performance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = [
    { name: 'RUS', value: performance?.rusAverage || 0 },
    { name: 'DRS', value: performance?.drsAverage || 0 },
    { name: 'Match Score', value: performance?.averageMatchScore || 0 },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Algorithm Performance</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ActivityIcon className="h-5 w-5 mr-2 text-blue-500" />
          Algorithm Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-green-500 mb-1" />
            <div className="text-2xl font-bold">{Math.round(performance?.successRate * 100 || 0)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-500 mb-1" />
            <div className="text-2xl font-bold">{performance?.averageMatchScore.toFixed(1) || 0}</div>
            <div className="text-sm text-muted-foreground">Avg. Match Score</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
            <BarChartIcon className="h-6 w-6 text-purple-500 mb-1" />
            <div className="text-2xl font-bold">{performance?.matchCount || 0}</div>
            <div className="text-sm text-muted-foreground">Total Matches</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
            <Clock className="h-6 w-6 text-amber-500 mb-1" />
            <div className="text-2xl font-bold">{performance?.averageResponseTime.toFixed(1) || 0}</div>
            <div className="text-sm text-muted-foreground">Avg. Response (min)</div>
          </div>
        </div>
        
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Recent Matches</h3>
          <div className="space-y-2">
            {performance?.recentMatches.map((match, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm">
                <span>Request #{match.requestId} → Donor #{match.donorId}</span>
                <div className="flex items-center">
                  <span className="mr-2">Score: {match.matchScore}</span>
                  {match.wasSuccessful ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmPerformanceCard;
