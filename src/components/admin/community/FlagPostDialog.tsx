
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface FlagPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flagReason: string;
  setFlagReason: (reason: string) => void;
  onFlagPost: () => Promise<void>;
  loading: boolean;
}

const FlagPostDialog = ({ 
  open, 
  onOpenChange, 
  flagReason, 
  setFlagReason, 
  onFlagPost,
  loading
}: FlagPostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Flag Post for Review</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-10 w-10 text-amber-500 mr-3" />
            <p>Please provide a reason for flagging this post</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="flag-reason">Reason</Label>
              <Textarea 
                id="flag-reason" 
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Why should this post be reviewed by moderators?"
                rows={4}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onFlagPost}
            disabled={!flagReason.trim() || loading}
          >
            {loading ? "Processing..." : "Flag Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlagPostDialog;
