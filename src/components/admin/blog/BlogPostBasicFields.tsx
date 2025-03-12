
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlogPost } from '@/types/apiTypes';

export interface BlogPostBasicFieldsProps {
  formData: BlogPost;
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
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const value = target.value.trim();
      
      if (value && !formData.tags.includes(value)) {
        const newTags = [...formData.tags, value];
        onTagsChange(newTags);
        target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = formData.tags.filter(tag => tag !== tagToRemove);
    onTagsChange(newTags);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mock file upload - in a real app, this would upload to a server
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onImageChange(reader.result.toString());
      }
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
          value={formData.title}
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
          value={formData.excerpt}
          onChange={onChange}
          placeholder="Brief summary of the post"
          required
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          name="status"
          value={formData.status} 
          onValueChange={(value) => {
            const event = {
              target: { name: 'status', value }
            } as unknown as ChangeEvent<HTMLSelectElement>;
            onChange(event);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          name="category"
          value={formData.category} 
          onValueChange={(value) => {
            const event = {
              target: { name: 'category', value }
            } as unknown as ChangeEvent<HTMLSelectElement>;
            onChange(event);
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
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <div key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-md flex items-center gap-1">
              <span>{tag}</span>
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="text-primary-800 hover:text-primary-900"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <Input
          id="tags"
          placeholder="Add tags (press Enter or comma to add)"
          onKeyDown={handleTagInput}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Press Enter or comma after each tag
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Featured Image</Label>
        <div className="flex flex-col gap-2">
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={onChange}
            placeholder="Image URL"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">or</span>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        
        {formData.imageUrl && (
          <div className="mt-2 border rounded-md overflow-hidden h-40">
            <img
              src={formData.imageUrl}
              alt="Featured"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostBasicFields;
