
import React from "react";
import { Bot, CheckCircle, AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AIModelConfig } from "../types";

interface AIModelCardProps {
  modelKey: string;
  modelName: string;
  iconColor: string;
  modelConfig: AIModelConfig;
  modelOptions: { value: string; label: string }[];
  showApiKey: boolean;
  onToggleShowApiKey: (model: string) => void;
  onModelChange: (model: string, field: string, value: any) => void;
  onTestConnection: (model: string) => void;
}

const AIModelCard: React.FC<AIModelCardProps> = ({
  modelKey,
  modelName,
  iconColor,
  modelConfig,
  modelOptions,
  showApiKey,
  onToggleShowApiKey,
  onModelChange,
  onTestConnection,
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className={`h-5 w-5 ${iconColor}`} />
          <h3 className="text-lg font-medium">{modelName}</h3>
        </div>
        <Switch 
          checked={modelConfig.enabled} 
          onCheckedChange={(checked) => onModelChange(modelKey, 'enabled', checked)}
        />
      </div>
      
      {modelConfig.enabled && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${modelKey}-key`}>API Key</Label>
              <div className="relative">
                <Input 
                  id={`${modelKey}-key`} 
                  type={showApiKey ? "text" : "password"} 
                  value={modelConfig.apiKey} 
                  onChange={(e) => onModelChange(modelKey, 'apiKey', e.target.value)}
                  placeholder={`Enter ${modelKey} API Key`}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => onToggleShowApiKey(modelKey)}
                >
                  {showApiKey ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              
              {modelConfig.connectionTested && (
                <div className={`mt-1 flex items-center text-xs ${modelConfig.connectionSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {modelConfig.connectionSuccess ? (
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
              <Label htmlFor={`${modelKey}-model`}>Model</Label>
              <Select 
                value={modelConfig.model}
                onValueChange={(value) => onModelChange(modelKey, 'model', value)}
              >
                <SelectTrigger id={`${modelKey}-model`}>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => onTestConnection(modelKey)}
          >
            Test Connection
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIModelCard;
