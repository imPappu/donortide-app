
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Image, BarChart2, X, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";

const NewPostForm = () => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<'text' | 'image' | 'poll'>('text');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  const handlePostSubmit = () => {
    if (postType === 'text' && !newPost.trim()) return;
    if (postType === 'image' && !selectedImage && !newPost.trim()) return;
    if (postType === 'poll' && (!pollQuestion.trim() || pollOptions.filter(opt => opt.trim()).length < 2)) return;
    
    // In a real app, we would save the post to the database here
    // For now, we'll just show a toast message
    
    toast({
      title: "Post created",
      description: `Your ${postType} post has been shared with the community`,
    });
    
    // Reset the form
    setNewPost("");
    setSelectedImage(null);
    setPostType('text');
    setPollQuestion("");
    setPollOptions(["", ""]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPostType('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (!newPost.trim()) {
      setPostType('text');
    }
  };

  const openPollDialog = () => {
    setIsPollDialogOpen(true);
    setPostType('poll');
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
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
      setPollOptions(newOptions);
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
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
    // The poll will be submitted when the user clicks the Post button
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-3">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>
                {user ? user.name.charAt(0) : <User className="h-6 w-6 text-gray-600" />}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <Textarea 
              placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'there'}?`}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-3"
            />
            
            {selectedImage && (
              <div className="relative mb-3">
                <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-md" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={removeSelectedImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {postType === 'poll' && !isPollDialogOpen && (
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
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-muted-foreground"
                  onClick={triggerFileInput}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-muted-foreground"
                  onClick={openPollDialog}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Poll
                </Button>
              </div>
              
              <Button onClick={handlePostSubmit}>Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
      
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
                onChange={(e) => setPollQuestion(e.target.value)}
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
    </Card>
  );
};

export default NewPostForm;
