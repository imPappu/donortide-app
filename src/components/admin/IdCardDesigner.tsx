
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Pencil, Download, Copy, Trash, Check, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IdCardTemplate {
  id: string;
  name: string;
  type: "donor" | "volunteer";
  bgColor: string;
  textColor: string;
  logoPosition: "left" | "center" | "right";
  showQrCode: boolean;
  showPhoto: boolean;
  borderColor: string;
  customFields: string[];
}

const defaultTemplates: IdCardTemplate[] = [
  {
    id: "1",
    name: "Standard Donor Card",
    type: "donor",
    bgColor: "#ffffff",
    textColor: "#000000",
    logoPosition: "left",
    showQrCode: true,
    showPhoto: true,
    borderColor: "#ff5555",
    customFields: ["Blood Type", "Last Donation"]
  },
  {
    id: "2",
    name: "Premium Volunteer Card",
    type: "volunteer",
    bgColor: "#f8f9fa",
    textColor: "#212529",
    logoPosition: "center",
    showQrCode: true,
    showPhoto: true,
    borderColor: "#4c6ef5",
    customFields: ["Role", "Joining Date", "Skills"]
  }
];

const IdCardDesigner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("donor");
  const [templates, setTemplates] = useState<IdCardTemplate[]>(defaultTemplates);
  const [editingTemplate, setEditingTemplate] = useState<IdCardTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleEditTemplate = (template: IdCardTemplate) => {
    setEditingTemplate({...template});
    setPreviewMode(false);
  };
  
  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    
    setTemplates(prev => {
      const index = prev.findIndex(t => t.id === editingTemplate.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = editingTemplate;
        return updated;
      }
      return [...prev, {...editingTemplate, id: Date.now().toString()}];
    });
    
    toast({
      title: "Template Saved",
      description: "ID card template has been saved successfully.",
    });
    
    setEditingTemplate(null);
  };
  
  const handleDuplicateTemplate = (template: IdCardTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    
    toast({
      title: "Template Duplicated",
      description: "ID card template has been duplicated.",
    });
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: "Template Deleted",
      description: "ID card template has been deleted.",
    });
  };
  
  const handleDownloadTemplate = (template: IdCardTemplate) => {
    // This would actually generate a PDF or image in a real implementation
    toast({
      title: "Template Downloaded",
      description: `${template.name} template has been downloaded.`,
    });
  };
  
  const filterTemplatesByType = (type: "donor" | "volunteer") => {
    return templates.filter(t => t.type === type);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ID Card Designer</h1>
        <p className="text-muted-foreground">Create and manage ID card templates for donors and volunteers</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="donor">Donor ID Cards</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer ID Cards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="donor" className="space-y-4">
          {editingTemplate && editingTemplate.type === "donor" ? (
            <TemplateEditor 
              template={editingTemplate} 
              setTemplate={setEditingTemplate}
              onSave={handleSaveTemplate}
              onCancel={() => setEditingTemplate(null)}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
          ) : (
            <TemplateList 
              templates={filterTemplatesByType("donor")}
              onEdit={handleEditTemplate}
              onDuplicate={handleDuplicateTemplate}
              onDelete={handleDeleteTemplate}
              onDownload={handleDownloadTemplate}
              onCreateNew={() => handleEditTemplate({
                id: "",
                name: "New Donor Card",
                type: "donor",
                bgColor: "#ffffff",
                textColor: "#000000",
                logoPosition: "left",
                showQrCode: true,
                showPhoto: true,
                borderColor: "#ff5555",
                customFields: []
              })}
            />
          )}
        </TabsContent>
        
        <TabsContent value="volunteer" className="space-y-4">
          {editingTemplate && editingTemplate.type === "volunteer" ? (
            <TemplateEditor 
              template={editingTemplate} 
              setTemplate={setEditingTemplate}
              onSave={handleSaveTemplate}
              onCancel={() => setEditingTemplate(null)}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
          ) : (
            <TemplateList 
              templates={filterTemplatesByType("volunteer")}
              onEdit={handleEditTemplate}
              onDuplicate={handleDuplicateTemplate}
              onDelete={handleDeleteTemplate}
              onDownload={handleDownloadTemplate}
              onCreateNew={() => handleEditTemplate({
                id: "",
                name: "New Volunteer Card",
                type: "volunteer",
                bgColor: "#ffffff",
                textColor: "#000000",
                logoPosition: "left",
                showQrCode: true,
                showPhoto: true,
                borderColor: "#4c6ef5",
                customFields: []
              })}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TemplateListProps {
  templates: IdCardTemplate[];
  onEdit: (template: IdCardTemplate) => void;
  onDuplicate: (template: IdCardTemplate) => void;
  onDelete: (id: string) => void;
  onDownload: (template: IdCardTemplate) => void;
  onCreateNew: () => void;
}

const TemplateList = ({ 
  templates, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onDownload, 
  onCreateNew 
}: TemplateListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onCreateNew}>Create New Template</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card key={template.id} className="overflow-hidden">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b">
              <IdCardPreview template={template} isSmall />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{template.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(template)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDuplicate(template)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDownload(template)}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="text-red-500" onClick={() => onDelete(template.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface TemplateEditorProps {
  template: IdCardTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<IdCardTemplate | null>>;
  onSave: () => void;
  onCancel: () => void;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateEditor = ({ 
  template, 
  setTemplate, 
  onSave, 
  onCancel,
  previewMode,
  setPreviewMode
}: TemplateEditorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setTemplate(prev => prev ? { ...prev, [name]: (e.target as HTMLInputElement).checked } : null);
    } else {
      setTemplate(prev => prev ? { ...prev, [name]: value } : null);
    }
  };
  
  const handleAddCustomField = () => {
    setTemplate(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customFields: [...prev.customFields, "New Field"]
      };
    });
  };
  
  const handleCustomFieldChange = (index: number, value: string) => {
    setTemplate(prev => {
      if (!prev) return null;
      const updatedFields = [...prev.customFields];
      updatedFields[index] = value;
      return {
        ...prev,
        customFields: updatedFields
      };
    });
  };
  
  const handleRemoveCustomField = (index: number) => {
    setTemplate(prev => {
      if (!prev) return null;
      const updatedFields = [...prev.customFields];
      updatedFields.splice(index, 1);
      return {
        ...prev,
        customFields: updatedFields
      };
    });
  };
  
  if (!template) return null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {template.id ? `Edit ${template.name}` : `Create New ${template.type === "donor" ? "Donor" : "Volunteer"} ID Card`}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!previewMode ? (
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={template.name} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="bgColor" 
                        name="bgColor" 
                        value={template.bgColor} 
                        onChange={handleChange} 
                      />
                      <input 
                        type="color" 
                        value={template.bgColor}
                        onChange={(e) => setTemplate(prev => prev ? {...prev, bgColor: e.target.value} : null)}
                        className="w-10 h-10 p-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="textColor" 
                        name="textColor" 
                        value={template.textColor} 
                        onChange={handleChange} 
                      />
                      <input 
                        type="color" 
                        value={template.textColor}
                        onChange={(e) => setTemplate(prev => prev ? {...prev, textColor: e.target.value} : null)}
                        className="w-10 h-10 p-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderColor">Border Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="borderColor" 
                        name="borderColor" 
                        value={template.borderColor} 
                        onChange={handleChange} 
                      />
                      <input 
                        type="color" 
                        value={template.borderColor}
                        onChange={(e) => setTemplate(prev => prev ? {...prev, borderColor: e.target.value} : null)}
                        className="w-10 h-10 p-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="logoPosition">Logo Position</Label>
                    <select 
                      id="logoPosition" 
                      name="logoPosition" 
                      value={template.logoPosition} 
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="showQrCode" 
                      name="showQrCode"
                      checked={template.showQrCode}
                      onChange={(e) => setTemplate(prev => prev ? {...prev, showQrCode: e.target.checked} : null)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="showQrCode">Show QR Code</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="showPhoto" 
                      name="showPhoto"
                      checked={template.showPhoto}
                      onChange={(e) => setTemplate(prev => prev ? {...prev, showPhoto: e.target.checked} : null)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="showPhoto">Show Photo</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Custom Fields</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddCustomField}>
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {template.customFields.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={field} 
                          onChange={(e) => handleCustomFieldChange(index, e.target.value)} 
                          placeholder="Field name"
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveCustomField(index)}
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {template.customFields.length === 0 && (
                      <p className="text-sm text-muted-foreground">No custom fields added.</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={onSave}>Save Template</Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex justify-center py-8">
              <IdCardPreview template={template} />
            </CardContent>
          )}
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <IdCardPreview template={template} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface IdCardPreviewProps {
  template: IdCardTemplate;
  isSmall?: boolean;
}

const IdCardPreview = ({ template, isSmall = false }: IdCardPreviewProps) => {
  const { bgColor, textColor, borderColor, logoPosition, showQrCode, showPhoto, type } = template;
  
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-lg ${isSmall ? "w-full max-w-[200px]" : "w-full max-w-[350px]"}`}
      style={{ backgroundColor: bgColor, color: textColor, border: `2px solid ${borderColor}` }}
    >
      <div className="p-4">
        <div className={`flex items-center ${
          logoPosition === "center" ? "justify-center" : 
          logoPosition === "right" ? "justify-end" : "justify-start"
        }`}>
          <div className="bg-white rounded-full p-2">
            <img 
              src="https://placehold.co/40x40" 
              alt="Organization Logo" 
              className="h-10 w-10"
            />
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <h3 className={`font-bold ${isSmall ? "text-lg" : "text-xl"}`}>
            {type === "donor" ? "BLOOD DONOR" : "VOLUNTEER"}
          </h3>
          <div className={`mt-1 ${isSmall ? "text-xs" : "text-sm"}`}>ID: 12345678</div>
        </div>
        
        <div className="mt-4 flex items-center gap-4">
          {showPhoto && (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1">
            <div className={`font-bold ${isSmall ? "text-sm" : "text-base"}`}>John Doe</div>
            {template.customFields.map((field, index) => (
              <div key={index} className={`${isSmall ? "text-xs" : "text-sm"} flex justify-between`}>
                <span>{field}:</span>
                <span className="font-medium">
                  {field === "Blood Type" ? "O+" : 
                   field === "Last Donation" ? "2023-05-15" :
                   field === "Role" ? "Coordinator" :
                   field === "Joining Date" ? "2022-01-10" :
                   field === "Skills" ? "First Aid" : "Value"}
                </span>
              </div>
            ))}
          </div>
          
          {showQrCode && (
            <div className="w-16 h-16 bg-white">
              <img 
                src="https://placehold.co/64x64/png?text=QR" 
                alt="QR Code" 
                className="w-full h-full"
              />
            </div>
          )}
        </div>
        
        <div className={`mt-3 text-center ${isSmall ? "text-xs" : "text-sm"}`}>
          <div>Blood Donation Center</div>
          <div>123 Health Street, City, Country</div>
        </div>
      </div>
    </div>
  );
};

export default IdCardDesigner;
