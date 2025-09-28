import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText } from "lucide-react";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";
import TemplateRenderer from "../resume/TemplateRenderer";
import { exportResumeToPDF } from "@/lib/pdf-export";

interface SimplePreviewModalProps {
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

const SimplePreviewModal = ({
  template,
  isOpen,
  onClose,
  onUse,
}: SimplePreviewModalProps) => {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!template) return null;

  const handleExportPDF = async () => {
    if (!previewContainerRef.current || !template.sampleData) {
      console.error('Preview container or sample data not found');
      return;
    }

    try {
      setIsExporting(true);
      
      const filename = `${template.name}_Preview_${new Date().toISOString().split('T')[0]}.pdf`;
      
      await exportResumeToPDF(template.sampleData, previewContainerRef, {
        filename,
        format: 'A4',
        orientation: 'portrait',
        quality: 1.0
      });
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'classic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'creative':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'professional':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {template.name}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
                {template.description && (
                  <p className="text-gray-600 text-sm">{template.description}</p>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content - Scrollable Area */}
        <div className="flex-1 bg-gray-50 overflow-hidden min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              {/* Live Preview - Scrollable */}
              {template.templateSchema && template.sampleData ? (
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl" ref={previewContainerRef}>
                    <TemplateRenderer 
                      template={template.templateSchema} 
                      data={template.sampleData}
                      className="shadow-2xl border border-gray-200 bg-white rounded-lg overflow-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray-100 rounded-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">📄</span>
                    </div>
                    <p className="text-gray-500">Preview not available</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to create your resume with this template?
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="px-4">
                Cancel
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportPDF} 
                disabled={isExporting || !template.sampleData}
                className="px-4"
              >
                {isExporting ? (
                  <>
                    <FileText className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </>
                )}
              </Button>
              <Button
                onClick={() => onUse(template.id)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
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

export default SimplePreviewModal;
