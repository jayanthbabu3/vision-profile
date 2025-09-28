import { useState } from "react";
import { X, Download, Eye, Crown, Calendar, Tag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TemplatePreviewModalProps {
  template: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    tags: string[];
    isPremium: boolean;
    previewUrl: string | null;
    templateUrl: string | null;
    createdAt: Date;
    sections?: Array<{
      id: string;
      name: string;
      order: number;
      isRequired: boolean;
      config: any;
    }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onUse: (templateId: string) => void;
}

const TemplatePreviewModal = ({
  template,
  isOpen,
  onClose,
  onUse,
}: TemplatePreviewModalProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  if (!template) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'classic':
        return 'bg-success/10 text-success border-success/20';
      case 'creative':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <DialogTitle className="text-2xl font-bold mb-2">
                  {template.name}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <div className="space-y-4">
              {/* Preview Image */}
              <div className="relative bg-slate-50 rounded-lg overflow-hidden">
                {template.previewUrl ? (
                  <img
                    src={template.previewUrl}
                    alt={template.name}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <Tag className="w-10 h-10 text-slate-500" />
                      </div>
                      <p className="text-slate-500">Preview Image Not Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {template.description && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-slate-600">{template.description}</p>
                </div>
              )}

              {/* Tags */}
              {template.tags.length > 0 && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <ScrollArea className="h-96">
              <div className="space-y-6">
                {/* Template Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Template Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Category:</span>
                          <Badge variant="secondary" className={getCategoryColor(template.category)}>
                            {template.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Type:</span>
                          <span>{template.isPremium ? 'Premium' : 'Free'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Created:</span>
                          <span>{formatDate(template.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Sections:</span>
                          <span>{template.sections?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>ATS-Friendly Format</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Professional Design</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Responsive Layout</span>
                        </div>
                        {template.isPremium && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-accent" />
                            <span>Premium Features</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-3 text-primary">How to Use This Template</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                    <li>Click "Use This Template" to start building your resume</li>
                    <li>Fill in your personal information and experience</li>
                    <li>Customize the content to match your target job</li>
                    <li>Preview and download your professional resume</li>
                  </ol>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="sections" className="mt-6">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {template.sections && template.sections.length > 0 ? (
                  <div className="space-y-3">
                    {template.sections
                      .sort((a, b) => a.order - b.order)
                      .map((section) => (
                        <div key={section.id} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{section.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Order: {section.order}
                              </Badge>
                              {section.isRequired && (
                                <Badge variant="destructive" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          {section.config && Object.keys(section.config).length > 0 && (
                            <div className="text-sm text-slate-600">
                              <p className="font-medium mb-1">Configuration:</p>
                              <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                                {JSON.stringify(section.config, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No sections defined for this template</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="p-6 pt-0 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(template.createdAt)}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => onUse(template.id)}
                className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
