
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlogPost } from '@/types/apiTypes';

export interface BlogPostBasicFieldsProps {
  formData: Partial<BlogPost>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onTagsChange: (tags: string[]) => void;
  onImageChange: (imageUrl: string) => void;
}

const BlogPostBasicFields: React.FC<BlogPostBasicFieldsProps> = ({ 
  formData, 
  onChange, 
  onTagsChange, 
  onImageChange 
}) => {
  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    onTagsChange(tagsArray);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload to a server
    // For now, we'll just create a data URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={onChange}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt || ""}
          onChange={onChange}
          placeholder="Brief summary of the post"
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={formData.category || ""} 
          onValueChange={(value) => {
            const e = {
              target: {
                name: "category",
                value
              }
            } as any;
            onChange(e);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="stories">Donor Stories</SelectItem>
            <SelectItem value="research">Research</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags?.join(', ') || ""}
          onChange={handleTagsChange}
          placeholder="blood donation, health, awareness"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={formData.author || ""}
          onChange={onChange}
          placeholder="Author name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Featured Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img 
              src={formData.imageUrl} 
              alt="Post preview" 
              className="max-h-32 rounded-md" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostBasicFields;
