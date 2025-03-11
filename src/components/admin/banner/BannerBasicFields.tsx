
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Banner } from "@/types/apiTypes";

export interface BannerBasicFieldsProps {
  formData: Partial<Banner>;
  onChange: (field: string, value: any) => void;
}

const BannerBasicFields: React.FC<BannerBasicFieldsProps> = ({ formData, onChange }) => {
  // Create a handler that converts ChangeEvent to the field/value format
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleInputChange}
          placeholder="Enter banner title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Banner Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content || ""}
          onChange={handleInputChange}
          placeholder="Enter banner content"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link">Button Text (Optional)</Label>
        <Input
          id="link"
          name="link"
          value={formData.link || ""}
          onChange={handleInputChange}
          placeholder="Learn More"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkUrl">Button URL (Optional)</Label>
        <Input
          id="linkUrl"
          name="linkUrl"
          value={formData.linkUrl || ""}
          onChange={handleInputChange}
          placeholder="https://example.com/page"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerBasicFields;
