import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Eye, Crown, Calendar, X } from "lucide-react";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";
import TemplateRenderer from "../resume/TemplateRenderer";

interface TemplatePreviewWithSchemaProps {
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
    templateSchema?: TemplateSchema | null;
    sampleData?: SampleResumeData | null;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onUse: (templateId: string) => void;
}

const TemplatePreviewWithSchema = ({
  template,
  isOpen,
  onClose,
  onUse,
}: TemplatePreviewWithSchemaProps) => {
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
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
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

        <Tabs defaultValue="preview" className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schema">Schema Info</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <div className="space-y-4">
              {/* Live Preview */}
              {template.templateSchema && template.sampleData ? (
                <div className="flex justify-center">
                  <div className="transform scale-75 origin-top">
                    <TemplateRenderer 
                      template={template.templateSchema} 
                      data={template.sampleData}
                      className="shadow-2xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">Preview not available</p>
                  </div>
                </div>
              )}

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
                          <span className="text-slate-500">Schema Version:</span>
                          <span>{template.templateSchema?.version || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Schema-Driven Rendering</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>ATS-Friendly Format</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Responsive Design</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Live Preview</span>
                        </div>
                        {template.isPremium && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
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
                    <li>Fill in your personal information and experience in the form</li>
                    <li>Watch the live preview update as you type</li>
                    <li>Customize the content to match your target job</li>
                    <li>Download your professional resume as PDF</li>
                  </ol>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="schema" className="mt-6">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {template.templateSchema ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Schema Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Version:</span>
                          <span className="ml-2 font-mono">{template.templateSchema.version}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Key:</span>
                          <span className="ml-2 font-mono">{template.templateSchema.key}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Page Size:</span>
                          <span className="ml-2">{template.templateSchema.page.size}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Margins:</span>
                          <span className="ml-2">{template.templateSchema.page.margins}px</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Typography</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-slate-500">Heading Font:</span>
                          <span className="ml-2 font-mono">{template.templateSchema.fonts.heading}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Body Font:</span>
                          <span className="ml-2 font-mono">{template.templateSchema.fonts.body}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Color Scheme</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border" 
                            style={{ backgroundColor: template.templateSchema.colors.primary }}
                          ></div>
                          <span className="text-slate-500">Primary:</span>
                          <span className="font-mono">{template.templateSchema.colors.primary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border" 
                            style={{ backgroundColor: template.templateSchema.colors.text }}
                          ></div>
                          <span className="text-slate-500">Text:</span>
                          <span className="font-mono">{template.templateSchema.colors.text}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border" 
                            style={{ backgroundColor: template.templateSchema.colors.muted }}
                          ></div>
                          <span className="text-slate-500">Muted:</span>
                          <span className="font-mono">{template.templateSchema.colors.muted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border" 
                            style={{ backgroundColor: template.templateSchema.colors.divider }}
                          ></div>
                          <span className="text-slate-500">Divider:</span>
                          <span className="font-mono">{template.templateSchema.colors.divider}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">Schema information not available</p>
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

export default TemplatePreviewWithSchema;
