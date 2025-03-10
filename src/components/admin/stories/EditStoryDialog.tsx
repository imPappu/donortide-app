
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Story } from "@/types/community";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface EditStoryDialogProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
  onSave: (storyId: string, updates: Partial<Story>) => Promise<void>;
}

const EditStoryDialog = ({ story, isOpen, onClose, onSave }: EditStoryDialogProps) => {
  const [content, setContent] = useState(story.content);
  const [expiresAt, setExpiresAt] = useState(format(new Date(story.expiresAt), "yyyy-MM-dd'T'HH:mm"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSave(story.id, {
        content,
        expiresAt,
      });
      onClose();
    } catch (error) {
      console.error("Error updating story:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Story</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="content">Caption</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expiration Date & Time</Label>
            <Input
              id="expiresAt"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>
          
          <div className="rounded-md overflow-hidden border">
            <video 
              src={story.videoUrl} 
              controls 
              className="w-full h-auto max-h-[200px] object-contain bg-black"
            />
            <div className="p-2 text-xs text-muted-foreground text-center border-t">
              Video cannot be changed after story is created
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStoryDialog;
