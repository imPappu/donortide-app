
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentGatewayFormField {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}

interface PaymentGatewayFormProps {
  gateway: string;
  fields: PaymentGatewayFormField[];
  fieldValues: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
}

const PaymentGatewayForm = ({ 
  gateway, 
  fields, 
  fieldValues,
  onFieldChange 
}: PaymentGatewayFormProps) => {
  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          
          {field.id.includes('mode') ? (
            <Select 
              value={fieldValues[field.id] || 'sandbox'} 
              onValueChange={(value) => onFieldChange(field.id, value)}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                <SelectItem value="live">Live (Production)</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input 
              id={field.id} 
              type={field.type || "text"} 
              placeholder={field.placeholder}
              value={fieldValues[field.id] || ''} 
              onChange={(e) => onFieldChange(field.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentGatewayForm;
