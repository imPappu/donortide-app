
import React from "react";
import { AIModelsState } from "../types";
import AIModelCard from "./AIModelCard";

interface AIModelsTabProps {
  models: AIModelsState;
  handleChange: (model: keyof AIModelsState, field: string, value: any) => void;
  testConnection: (model: keyof AIModelsState) => Promise<void>;
  saving: boolean;
}

const AIModelsTab: React.FC<AIModelsTabProps> = ({
  models,
  handleChange,
  testConnection,
  saving
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AIModelCard
          id="chatgpt"
          name="ChatGPT"
          description="OpenAI's powerful language model for natural language processing"
          model={models.chatgpt}
          onChange={(field, value) => handleChange('chatgpt', field, value)}
          testConnection={() => testConnection('chatgpt')}
          disabled={saving}
        />
        
        <AIModelCard
          id="deepseek"
          name="DeepSeek"
          description="Specialized AI model for deep code understanding and generation"
          model={models.deepseek}
          onChange={(field, value) => handleChange('deepseek', field, value)}
          testConnection={() => testConnection('deepseek')}
          disabled={saving}
        />
        
        <AIModelCard
          id="grok"
          name="Grok"
          description="Real-time AI assistant with up-to-date information and reasoning"
          model={models.grok}
          onChange={(field, value) => handleChange('grok', field, value)}
          testConnection={() => testConnection('grok')}
          disabled={saving}
        />
        
        <AIModelCard
          id="qwen"
          name="Qwen"
          description="Multilingual AI model with strong capabilities in various languages"
          model={models.qwen}
          onChange={(field, value) => handleChange('qwen', field, value)}
          testConnection={() => testConnection('qwen')}
          disabled={saving}
        />
      </div>
      
      <div className="bg-muted p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">About AI Models</h4>
        <p className="text-sm text-muted-foreground">
          Configure the AI models that power your platform's advanced features. 
          At least one model must be enabled and properly configured for AI features to function.
          Each model requires a valid API key from its respective provider.
        </p>
      </div>
    </div>
  );
};

export default AIModelsTab;
