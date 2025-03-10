
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Poll, PollOption } from "@/types/community";
import { toast } from "@/hooks/use-toast";

interface PollItemProps {
  poll: Poll;
  onVote: (pollWithUpdates: Poll) => void;
}

const PollItem = ({ poll, onVote }: PollItemProps) => {
  const handleVote = (optionId: string) => {
    if (poll.userVoted) {
      toast({
        title: "Already voted",
        description: "You can only vote once per poll",
      });
      return;
    }
    
    const updatedPoll = JSON.parse(JSON.stringify(poll));
    
    const option = updatedPoll.options.find((opt: PollOption) => opt.id === optionId);
    if (option) {
      option.votes++;
      updatedPoll.totalVotes++;
      updatedPoll.userVoted = optionId;
      
      onVote(updatedPoll);
      
      toast({
        title: "Vote recorded",
        description: "Your vote has been counted",
      });
    }
  };

  return (
    <div className="mb-4 bg-muted p-4 rounded-md">
      <h3 className="font-medium mb-3">{poll.question}</h3>
      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 
            ? Math.round((option.votes / poll.totalVotes) * 100) 
            : 0;
            
          return (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <Button
                  variant={poll.userVoted === option.id ? "default" : "outline"}
                  className="w-full justify-start"
                  disabled={!!poll.userVoted}
                  onClick={() => handleVote(option.id)}
                >
                  {option.text}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={percentage} className="h-2" />
                <span className="text-xs">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
      </p>
    </div>
  );
};

export default PollItem;
