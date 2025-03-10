
import React from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import PollCreator from "./PollCreator";
import { Tag as TagType } from "@/types/community";

interface FormActionsProps {
  newPost: string;
  selectedImage: string | null;
  postType: 'text' | 'image' | 'poll';
  pollQuestion: string;
  pollOptions: string[];
  onImageSelect: (image: string | null) => void;
  onPostSubmit: () => void;
  onSetPollMode: (isEnabled: boolean) => void;
  onPollQuestionChange: (question: string) => void;
  onPollOptionsChange: (options: string[]) => void;
  trendingTags: TagType[];
}

const FormActions = ({ 
  newPost,
  selectedImage,
  postType,
  pollQuestion,
  pollOptions,
  onImageSelect,
  onPostSubmit,
  onSetPollMode,
  onPollQuestionChange,
  onPollOptionsChange,
  trendingTags
}: FormActionsProps) => {
  const isPollMode = postType === 'poll';
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2">
        <ImageUploader 
          selectedImage={selectedImage} 
          onImageSelect={onImageSelect} 
        />
        
        <PollCreator 
          isPollMode={isPollMode}
          pollQuestion={pollQuestion}
          pollOptions={pollOptions}
          onPollQuestionChange={onPollQuestionChange}
          onPollOptionsChange={onPollOptionsChange}
          onSetPollMode={onSetPollMode}
        />
      </div>
      
      <Button onClick={onPostSubmit}>Post</Button>
    </div>
  );
};

export default FormActions;
