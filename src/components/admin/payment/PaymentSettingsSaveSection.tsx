
import React from 'react';
import { Button } from "@/components/ui/button";

interface PaymentSettingsSaveSectionProps {
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

const PaymentSettingsSaveSection = ({
  hasChanges,
  isSaving,
  onSave
}: PaymentSettingsSaveSectionProps) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        {hasChanges && (
          <span className="text-sm text-amber-600">
            You have unsaved changes
          </span>
        )}
      </div>
      <Button 
        onClick={onSave} 
        disabled={isSaving || !hasChanges}
      >
        {isSaving ? "Saving..." : "Save Payment Settings"}
      </Button>
    </div>
  );
};

export default PaymentSettingsSaveSection;
