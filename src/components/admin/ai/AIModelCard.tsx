
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AIModelConfig } from "../types";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface AIModelCardProps {
  id: string;
  name: string;
  description: string;
  model: AIModelConfig;
  onChange: (field: string, value: any) => void;
  testConnection: () => Promise<void>;
  disabled: boolean;
}

const AIModelCard: React.FC<AIModelCardProps> = ({
  id,
  name,
  description,
  model,
  onChange,
  testConnection,
  disabled
}) => {
  const getModelOptions = () => {
    switch (id) {
      case 'chatgpt':
        return [
          { value: 'gpt-4o', label: 'GPT-4o' },
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ];
      case 'deepseek':
        return [
          { value: 'deepseek-v2', label: 'DeepSeek v2' },
          { value: 'deepseek-coder', label: 'DeepSeek Coder' }
        ];
      case 'grok':
        return [
          { value: 'grok-1.5', label: 'Grok 1.5' },
          { value: 'grok-1', label: 'Grok 1' }
        ];
      case 'qwen':
        return [
          { value: 'qwen-72b', label: 'Qwen 72B' },
          { value: 'qwen-14b', label: 'Qwen 14B' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch 
          checked={model.enabled} 
          onCheckedChange={(checked) => onChange('enabled', checked)}
          disabled={disabled}
        />
      </div>
      
      {model.enabled && (
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-key`}>API Key</Label>
            <Input 
              id={`${id}-key`} 
              type="password" 
              value={model.apiKey} 
              onChange={(e) => onChange('apiKey', e.target.value)}
              placeholder={`Enter ${name} API Key`}
              disabled={disabled}
            />
            
            {model.connectionTested && (
              <div className={`mt-1 flex items-center text-xs ${model.connectionSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {model.connectionSuccess ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connection verified
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Connection failed
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${id}-model`}>Model</Label>
            <Select 
              value={model.model}
              onValueChange={(value) => onChange('model', value)}
              disabled={disabled}
            >
              <SelectTrigger id={`${id}-model`}>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {getModelOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            onClick={testConnection}
            disabled={disabled}
          >
            Test Connection
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIModelCard;
