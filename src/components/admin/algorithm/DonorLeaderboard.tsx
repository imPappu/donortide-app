
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { getDonorLeaderboard } from '@/services/algorithmService';
import { DonorLeaderboardEntry } from '@/types/algorithmTypes';
import { Trophy, Users, RefreshCw } from 'lucide-react';

const DonorLeaderboard = () => {
  const { toast } = useToast();
  const [leaderboard, setLeaderboard] = useState<DonorLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getDonorLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error loading donor leaderboard:", error);
      toast({
        title: "Error",
        description: "Failed to load donor leaderboard.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Top Donors Leaderboard</span>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {leaderboard.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((donor, index) => (
              <div
                key={donor.id}
                className={`flex items-center p-3 rounded-lg ${index < 3 ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
              >
                <div className="w-8 text-center font-bold text-lg">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                </div>
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={donor.avatar} alt={donor.name} />
                  <AvatarFallback>{getInitials(donor.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{donor.name}</div>
                  <div className="text-sm text-muted-foreground">{donor.donationCount} donations</div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge variant="secondary">{donor.bloodType}</Badge>
                  <div className="text-sm font-semibold mt-1">DRS: {donor.drs}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonorLeaderboard;
