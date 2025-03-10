import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Image, BarChart2, X, Plus, Hash, Tag } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import { TRENDING_TAGS } from "@/data/mockPosts";
import TagBadge from "./TagBadge";
import TagSuggestions from "./TagSuggestions";

const NewPostForm = () => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<'text' | 'image' | 'poll'>('text');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSuggestionQuery, setTagSuggestionQuery] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (tagInputRef.current && !tagInputRef.current.contains(e.target as Node)) {
        setShowTagSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
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
    
    if (selectedTags.length > 0) {
      toast({
        title: "Tags added",
        description: `Your post was tagged with: ${selectedTags.join(', ')}`,
      });
    }
    
    // Reset the form
    setNewPost("");
    setSelectedImage(null);
    setPostType('text');
    setPollQuestion("");
    setPollOptions(["", ""]);
    setSelectedTags([]);
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

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    
    // Update suggestion query for real-time suggestions
    if (value.startsWith('@')) {
      setTagSuggestionQuery(value.substring(1));
      setShowTagSuggestions(true);
    } else {
      setShowTagSuggestions(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().replace(/^@/, '');
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSelectSuggestedTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
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
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {selectedTags.map((tag, index) => (
                  <div key={index} className="relative inline-block">
                    <TagBadge tag={tag} />
                    <button 
                      className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white rounded-full flex items-center justify-center text-xs"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="relative mb-3">
              <div className="flex items-center gap-2">
                <Input
                  ref={tagInputRef}
                  placeholder="Type @ to add CauseTags..."
                  value={tagInput}
                  onChange={handleTagInputChange}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {showTagSuggestions && (
                <TagSuggestions 
                  query={tagSuggestionQuery}
                  tags={TRENDING_TAGS}
                  onSelectTag={handleSelectSuggestedTag}
                />
              )}
            </div>
            
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
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-muted-foreground"
                  onClick={() => setIsTagDialogOpen(true)}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  Tags
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
      
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add CauseTags</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tag-input">New Tag</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="tag-input" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Enter a tag name..."
                />
                <Button 
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
            
            {selectedTags.length > 0 && (
              <div>
                <Label>Selected Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map((tag, index) => (
                    <div key={index} className="relative inline-block">
                      <TagBadge tag={tag} />
                      <button 
                        className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white rounded-full flex items-center justify-center text-xs"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <Label>Trending Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TRENDING_TAGS.map(tag => (
                  <TagBadge 
                    key={tag.id} 
                    tag={tag.name} 
                    trending={tag.trending}
                    onClick={() => handleSelectSuggestedTag(tag.name)}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsTagDialogOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NewPostForm;
