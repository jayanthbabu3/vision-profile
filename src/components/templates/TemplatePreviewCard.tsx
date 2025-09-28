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
    <Card className="group relative overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-5 right-5 z-10">
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg px-3 py-1.5 rounded-full">
            <Crown className="w-3.5 h-3.5 mr-1.5" />
            Premium
          </Badge>
        </div>
      )}

      {/* Template Image */}
      <div 
        className="relative aspect-[3/4] overflow-hidden cursor-pointer bg-muted/20"
        onClick={handlePreview}
      >
        <img 
          src={getTemplateImage()}
          alt={`${name} template preview`}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-8 space-y-6">
        {/* Category and Title */}
        <div className="space-y-4">
          <Badge 
            variant="secondary" 
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground border-0"
          >
            {category}
          </Badge>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-xl text-foreground leading-tight">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            <span>ATS-Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-500" />
            <span>Professional</span>
          </div>
          {isPremium && (
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
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
                className="inline-block px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border/50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block px-3 py-1.5 text-xs bg-muted/30 text-muted-foreground/70 rounded-full border border-border/30">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-border hover:bg-accent hover:text-accent-foreground transition-colors"
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