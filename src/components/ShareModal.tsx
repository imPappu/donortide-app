
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Copy, Instagram, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface ShareModalProps {
  title: string;
  url: string;
  content: string;
  type: 'post' | 'story' | 'request';
}

const ShareModal = ({ title, url, content, type }: ShareModalProps) => {
  const generateShareMessage = () => {
    switch (type) {
      case 'request':
        return `Urgent Blood Needed! ${title}. Please help if you can. #DonorTide #SaveLives`;
      case 'story':
        return `Check out this inspiring story: "${title}" on DonorTide! #DonorTide #BloodDonation`;
      default:
        return `${content.substring(0, 50)}... Check it out on DonorTide! #DonorTide`;
    }
  };

  const shareMessage = generateShareMessage();
  
  const handleSocialShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareMessage)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareMessage} ${url}`)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, typically handled via app
        toast({
          title: "Instagram Sharing",
          description: "Copy the link and share it on Instagram",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    toast({
      title: "Shared Successfully",
      description: `Shared to ${platform}`,
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareMessage} ${url}`);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share {type === 'request' ? 'blood request' : type}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm">{shareMessage}</p>
          </div>
          
          <Input 
            value={url} 
            readOnly 
            onClick={(e) => e.currentTarget.select()} 
          />
          
          <div className="grid grid-cols-5 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto space-y-1"
              onClick={() => handleSocialShare('facebook')}
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto space-y-1"
              onClick={() => handleSocialShare('twitter')}
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto space-y-1"
              onClick={() => handleSocialShare('whatsapp')}
            >
              <Send className="h-5 w-5 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto space-y-1"
              onClick={() => handleSocialShare('instagram')}
            >
              <Instagram className="h-5 w-5 text-pink-600" />
              <span className="text-xs">Instagram</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto space-y-1"
              onClick={copyToClipboard}
            >
              <Copy className="h-5 w-5 text-gray-600" />
              <span className="text-xs">Copy</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
