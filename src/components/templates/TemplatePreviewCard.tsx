import React, { useState } from "react";
import { Eye, Crown, ChevronRight, Star, Calendar, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";
import TemplateRenderer from "@/components/resume/TemplateRenderer";

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
  templateSchema,
  sampleData,
  onPreview,
  onUse,
}: TemplatePreviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePreview = () => {
    if (onPreview) onPreview(id);
  };

  const handleUse = () => {
    if (onUse) onUse(id);
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'from-blue-500 to-cyan-500';
      case 'classic':
        return 'from-emerald-500 to-teal-500';
      case 'creative':
        return 'from-purple-500 to-pink-500';
      case 'professional':
        return 'from-indigo-500 to-blue-500';
      default:
        return 'from-slate-500 to-gray-500';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern':
        return 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200/50';
      case 'classic':
        return 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200/50';
      case 'creative':
        return 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200/50';
      case 'professional':
        return 'bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-700 border-indigo-200/50';
      default:
        return 'bg-gradient-to-r from-slate-500/10 to-gray-500/10 text-slate-700 border-slate-200/50';
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl cursor-pointer bg-card backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 right-3 z-20">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-3 left-3 z-20">
        <Badge variant="secondary" className={`${getCategoryBadgeColor(category)} backdrop-blur-sm`}>
          <Sparkles className="w-3 h-3 mr-1" />
          {category}
        </Badge>
      </div>

      {/* Template Preview Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-background to-muted/20">
        {templateSchema && sampleData ? (
          <div className="w-full h-full flex items-start justify-center p-1">
            <div 
              className="bg-white shadow-sm border transform origin-top rounded-md overflow-hidden"
              style={{
                width: '100%',
                height: '100%',
                transform: 'scale(0.95)',
                fontSize: '6px',
                lineHeight: '1.2',
              }}
            >
              <div className="w-full h-full overflow-hidden relative">
                <div style={{ 
                  transform: 'scale(0.35)', 
                  transformOrigin: 'top left',
                  width: '285%',
                  height: '285%'
                }}>
                  <TemplateRenderer 
                    template={{
                      ...templateSchema,
                      page: { ...templateSchema.page, margins: 12 }
                    }} 
                    data={sampleData}
                    className="border-0 shadow-none rounded-none overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Fallback to image based on template ID/category
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/10 to-muted/30">
            {/* Try to show template image based on ID or use category placeholder */}
            {id === 'classic' || category.toLowerCase() === 'classic' ? (
              <img 
                src="/assets/template-classic.jpg" 
                alt={`${name} template preview`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : id === 'modern' || category.toLowerCase() === 'modern' ? (
              <img 
                src="/assets/template-modern.jpg" 
                alt={`${name} template preview`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : id === 'creative' || category.toLowerCase() === 'creative' ? (
              <img 
                src="/assets/template-creative.jpg" 
                alt={`${name} template preview`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
              <img 
                src="/assets/resume-template.png" 
                alt={`${name} template preview`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            )}
            {/* Fallback icon if image fails */}
            <div className="hidden text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryGradient(category)} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                <Tag className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">Template Preview</p>
            </div>
          </div>
        )}

        {/* Hover Overlay with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-900 border-0 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick Preview
              </Button>
              <div className="flex items-center justify-center space-x-1 text-white/90 text-xs">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3 space-y-3">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4 space-y-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground border-border/50">
                +{tags.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Template Features */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>ATS-Friendly</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Modern Design</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="pt-0 gap-3">
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300 group/preview"
          onClick={handlePreview}
        >
          <Eye className="w-4 h-4 mr-2 group-hover/preview:scale-110 transition-transform" />
          Preview
        </Button>
        <Button 
          size="lg" 
          className={`flex-1 bg-gradient-to-r ${getCategoryGradient(category)} hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn`}
          onClick={handleUse}
        >
          <span>Use Template</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplatePreviewCard;