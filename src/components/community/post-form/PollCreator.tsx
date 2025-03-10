
import React, { useState } from "react";
import { BarChart2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Poll } from "@/types/community";

interface PollCreatorProps {
  isPollMode: boolean;
  pollQuestion: string;
  pollOptions: string[];
  onPollQuestionChange: (question: string) => void;
  onPollOptionsChange: (options: string[]) => void;
  onSetPollMode: (isEnabled: boolean) => void;
}

const PollCreator = ({ 
  isPollMode, 
  pollQuestion, 
  pollOptions, 
  onPollQuestionChange,
  onPollOptionsChange,
  onSetPollMode
}: PollCreatorProps) => {
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false);
  
  const openPollDialog = () => {
    setIsPollDialogOpen(true);
    onSetPollMode(true);
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) {
      onPollOptionsChange([...pollOptions, ""]);
    } else {
      toast({
        title: "Maximum options reached",
        description: "You can only add up to 5 options",
        variant: "destructive"
      });
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions];
      newOptions.splice(index, 1);
      onPollOptionsChange(newOptions);
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    onPollOptionsChange(newOptions);
  };

  const createPoll = () => {
    if (!pollQuestion.trim() || pollOptions.filter(opt => opt.trim()).length < 2) {
      toast({
        title: "Invalid poll",
        description: "Please provide a question and at least 2 options",
        variant: "destructive"
      });
      return;
    }
    
    setIsPollDialogOpen(false);
  };

  return (
    <>
      {isPollMode && !isPollDialogOpen && (
        <div className="mb-3 p-3 bg-muted rounded-md">
          <h3 className="font-medium mb-2">{pollQuestion}</h3>
          <ul className="space-y-2">
            {pollOptions.map((option, index) => (
              option.trim() && (
                <li key={index} className="bg-background p-2 rounded-md">
                  {option}
                </li>
              )
            ))}
          </ul>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2"
            onClick={() => setIsPollDialogOpen(true)}
          >
            Edit Poll
          </Button>
        </div>
      )}

      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-muted-foreground"
        onClick={openPollDialog}
      >
        <BarChart2 className="h-4 w-4 mr-2" />
        Poll
      </Button>
      
      <Dialog open={isPollDialogOpen} onOpenChange={setIsPollDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Poll</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="poll-question">Question</Label>
              <Input 
                id="poll-question" 
                value={pollQuestion} 
                onChange={(e) => onPollQuestionChange(e.target.value)}
                placeholder="Ask a question..."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Options</Label>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input 
                    value={option} 
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  {pollOptions.length > 2 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removePollOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {pollOptions.length < 5 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={addPollOption}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsPollDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createPoll}>
                Create Poll
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PollCreator;
