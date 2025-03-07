
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentGatewayFormField {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}

interface PaymentGatewayFormProps {
  gateway: string;
  fields: PaymentGatewayFormField[];
}

const PaymentGatewayForm = ({ gateway, fields }: PaymentGatewayFormProps) => {
  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          {field.id.includes('mode') ? (
            <select id={field.id} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="sandbox">Sandbox (Testing)</option>
              <option value="live">Live (Production)</option>
            </select>
          ) : (
            <Input 
              id={field.id} 
              type={field.type || "text"} 
              placeholder={field.placeholder} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentGatewayForm;
