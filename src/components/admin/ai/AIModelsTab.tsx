
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIModelCard from "./AIModelCard";
import { AIModelsState } from "../types";

interface AIModelsTabProps {
  aiModels: AIModelsState;
  showApiKeys: Record<string, boolean>;
  toggleShowApiKey: (model: string) => void;
  handleAIModelChange: (model: string, field: string, value: any) => void;
  testAIConnection: (model: string) => void;
  saving: boolean;
  saveAIConfiguration: () => Promise<void>;
}

const AIModelsTab: React.FC<AIModelsTabProps> = ({
  aiModels,
  showApiKeys,
  toggleShowApiKey,
  handleAIModelChange,
  testAIConnection,
  saving,
  saveAIConfiguration,
}) => {
  const modelConfigs = [
    {
      key: 'chatgpt',
      name: 'ChatGPT / OpenAI',
      color: 'text-green-500',
      options: [
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
      ]
    },
    {
      key: 'deepseek',
      name: 'DeepSeek',
      color: 'text-purple-500',
      options: [
        { value: 'deepseek-v2', label: 'DeepSeek-V2' },
        { value: 'deepseek-coder', label: 'DeepSeek Coder' }
      ]
    },
    {
      key: 'grok',
      name: 'Grok',
      color: 'text-red-500',
      options: [
        { value: 'grok-1.5', label: 'Grok 1.5' },
        { value: 'grok-1', label: 'Grok 1' }
      ]
    },
    {
      key: 'qwen',
      name: 'Qwen',
      color: 'text-blue-500',
      options: [
        { value: 'qwen-72b', label: 'Qwen 72B' },
        { value: 'qwen-max', label: 'Qwen Max' }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Configure AI models to power your platform monitoring and automation. All processing happens on your server to protect user data privacy.
        </AlertDescription>
      </Alert>
      
      {modelConfigs.map(model => (
        <AIModelCard
          key={model.key}
          modelKey={model.key}
          modelName={model.name}
          iconColor={model.color}
          modelConfig={aiModels[model.key as keyof AIModelsState]}
          modelOptions={model.options}
          showApiKey={showApiKeys[model.key]}
          onToggleShowApiKey={toggleShowApiKey}
          onModelChange={handleAIModelChange}
          onTestConnection={testAIConnection}
        />
      ))}
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={saveAIConfiguration} 
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save AI Configuration'}
        </Button>
      </div>
    </div>
  );
};

export default AIModelsTab;
