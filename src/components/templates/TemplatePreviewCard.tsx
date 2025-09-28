import React from "react";
import { Eye, Crown, ChevronRight, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";

export interface TemplatePreviewCardProps {
  id: string;
  name: string;
  description: string | null;
  category: string;
  tags: string[];
  isPremium: boolean;
  templateSchema?: TemplateSchema | null;
  sampleData?: SampleResumeData | null;
  onPreview?: (templateId: string) => void;
  onUse?: (templateId: string) => void;
}

const TemplatePreviewCard = ({
  id,
  name,
  description,
  category,
  tags,
  isPremium,
  onPreview,
  onUse,
}: TemplatePreviewCardProps) => {
  const handlePreview = () => {
    if (onPreview) onPreview(id);
  };

  const handleUse = () => {
    if (onUse) onUse(id);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'classic':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'creative':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'professional':
        return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getTemplateImage = () => {
    if (id === 'classic' || category.toLowerCase() === 'classic') {
      return "/assets/template-classic.jpg";
    } else if (id === 'modern' || category.toLowerCase() === 'modern') {
      return "/assets/template-modern.jpg";
    } else if (id === 'creative' || category.toLowerCase() === 'creative') {
      return "/assets/template-creative.jpg";
    } else {
      return "/assets/resume-template.png";
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg px-3 py-1">
            <Crown className="w-3 h-3 mr-1.5" />
            Premium
          </Badge>
        </div>
      )}

      {/* Template Image */}
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={handlePreview}
      >
        <img 
          src={getTemplateImage()}
          alt={`${name} template preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Preview Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="sm"
            className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg border-0"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Category and Title */}
        <div className="space-y-3">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(category)} text-xs font-medium px-2.5 py-1`}
          >
            {category}
          </Badge>
          
          <div>
            <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            <span>ATS-Ready</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-blue-500" />
            <span>Professional</span>
          </div>
          {isPremium && (
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Premium</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2.5 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-200"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block px-2.5 py-1 text-xs bg-gray-50 text-gray-500 rounded-full border border-gray-200">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
            onClick={handlePreview}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleUse}
          >
            Use Template
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatePreviewCard;