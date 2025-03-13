
import React from "react";
import { Label } from "@/components/ui/label";
import { CategoryFormData, iconOptions } from "./types";

interface CategoryPreviewProps {
  formData: CategoryFormData;
}

const CategoryPreview = ({ formData }: CategoryPreviewProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">Preview</Label>
      <div className="col-span-3 border rounded-lg p-2 flex items-center">
        <div className={`${formData.color} rounded-md p-2 flex items-center justify-center mr-3`}>
          {iconOptions.find(icon => icon.id === formData.iconId)?.icon}
        </div>
        <div>
          <p className="font-medium">{formData.name || "Category Name"}</p>
          <p className="text-xs text-muted-foreground">{formData.description || "Category description goes here"}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPreview;
