
import React, { useState, useRef, useEffect } from "react";
import { Tag, X, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import TagBadge from "../TagBadge";
import TagSuggestions from "../TagSuggestions";
import { Tag as TagType } from "@/types/community";

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  trendingTags: TagType[];
}

const TagSelector = ({ selectedTags, onTagsChange, trendingTags }: TagSelectorProps) => {
  const [tagInput, setTagInput] = useState("");
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagSuggestionQuery, setTagSuggestionQuery] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

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
      onTagsChange([...selectedTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSelectSuggestedTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  return (
    <>
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
            tags={trendingTags}
            onSelectTag={handleSelectSuggestedTag}
          />
        )}
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-muted-foreground"
        onClick={() => setIsTagDialogOpen(true)}
      >
        <Hash className="h-4 w-4 mr-2" />
        Tags
      </Button>
      
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
                {trendingTags.map(tag => (
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
    </>
  );
};

export default TagSelector;
