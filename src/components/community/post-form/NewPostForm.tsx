
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User, PencilLine } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { v4 as uuidv4 } from "uuid";
import { TRENDING_TAGS } from "@/data/mockPosts";
import TagSelector from "./TagSelector";
import FormActions from "./FormActions";

const NewPostForm = () => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<'text' | 'image' | 'poll'>('text');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { user } = useAuth();
  
  const handlePostSubmit = () => {
    if (postType === 'text' && !newPost.trim()) return;
    if (postType === 'image' && !selectedImage && !newPost.trim()) return;
    if (postType === 'poll' && (!pollQuestion.trim() || pollOptions.filter(opt => opt.trim()).length < 2)) return;
    
    // In a real app, we would save the post to the database here
    
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

  const handleImageSelect = (image: string | null) => {
    setSelectedImage(image);
    if (image) {
      setPostType('image');
    } else if (!newPost.trim()) {
      setPostType('text');
    }
  };

  const handleSetPollMode = (isEnabled: boolean) => {
    if (isEnabled) {
      setPostType('poll');
    } else {
      setPostType(selectedImage ? 'image' : 'text');
    }
  };

  return (
    <Card className="mb-6 border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-3">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-700">
                {user ? user.name.charAt(0) : <User className="h-6 w-6 text-gray-600" />}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="relative mb-3">
              <Textarea 
                placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'there'}?`}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="resize-none pr-10 min-h-[60px]"
              />
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <PencilLine className="h-5 w-5" />
              </button>
            </div>
            
            {/* Image preview is handled by ImageUploader component */}
            
            {/* Poll preview is handled by PollCreator component */}
            
            {/* Tags are handled by TagSelector component */}
            <TagSelector 
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              trendingTags={TRENDING_TAGS}
            />
            
            <FormActions 
              newPost={newPost}
              selectedImage={selectedImage}
              postType={postType}
              pollQuestion={pollQuestion}
              pollOptions={pollOptions}
              onImageSelect={handleImageSelect}
              onPostSubmit={handlePostSubmit}
              onSetPollMode={handleSetPollMode}
              onPollQuestionChange={setPollQuestion}
              onPollOptionsChange={setPollOptions}
              trendingTags={TRENDING_TAGS}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
