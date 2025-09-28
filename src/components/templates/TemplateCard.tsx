import { useState } from "react";
import { Eye, Crown, ChevronRight, Star, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";

export interface TemplateCardProps {
  id: string;
  name: string;
  description: string | null;
  category: string;
  tags: string[];
  isPremium: boolean;
  previewUrl: string | null;
  templateUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  sections?: Array<{
    id: string;
    name: string;
    order: number;
    isRequired: boolean;
    config: any;
  }>;
  templateSchema?: TemplateSchema | null;
  sampleData?: SampleResumeData | null;
  onPreview?: (templateId: string) => void;
  onUse?: (templateId: string) => void;
}

const TemplateCard = ({
  id,
  name,
  description,
  category,
  tags,
  isPremium,
  previewUrl,
  templateUrl,
  createdAt,
  sections = [],
  onPreview,
  onUse,
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePreview = () => {
    if (onPreview) onPreview(id);
  };

  const handleUse = () => {
    if (onUse) onUse(id);
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
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card 
      className="group relative overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge variant="secondary" className={getCategoryColor(category)}>
          {category}
        </Badge>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        {previewUrl ? (
          <div className="w-full h-full p-6">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
              <img
                src={previewUrl}
                alt={name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-300 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Tag className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-500">Preview Image</p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={handlePreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-500">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Template Info */}
        <div className="space-y-2 text-sm text-slate-500">
          {sections.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-600">{sections.length}</span>
              </div>
              <span>Sections</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDate(createdAt)}</span>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="pt-0 gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200"
          onClick={handlePreview}
        >
          Preview
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 group/btn"
          onClick={handleUse}
        >
          <span>Use Template</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
