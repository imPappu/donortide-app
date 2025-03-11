
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface EmailTemplateEditorProps {
  templateName: string;
  content: string;
  onChange: (content: string) => void;
  onReset: () => void;
}

export default function EmailTemplateEditor({ 
  templateName, 
  content, 
  onChange, 
  onReset 
}: EmailTemplateEditorProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{templateName} Template</h3>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </div>
      
      <div className="border rounded-md p-4 min-h-[400px] bg-white dark:bg-gray-950">
        <textarea
          className="w-full h-[400px] p-2 border rounded"
          value={content}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
}
