import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";
import TemplateCardPreview from "./TemplateCardPreview";

interface TemplateCarouselProps {
  templates: Array<{
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
  }>;
  onPreview?: (templateId: string) => void;
  onUse?: (templateId: string) => void;
}

const TemplateCarousel = ({ templates, onPreview, onUse }: TemplateCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % templates.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, templates.length]);

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

  if (templates.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50/50" />
      <div className="absolute inset-0 bg-grid-slate-100/[0.02] bg-[size:20px_20px] opacity-30" />
      
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Template Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {templates.map((template, index) => {
              const distance = Math.abs(index - currentIndex);
              const isActive = index === currentIndex;
              const isVisible = distance <= 2; // Show 5 cards (2 on each side + center)
              
              if (!isVisible) return null;

              const scale = isActive ? 1 : 0.85 - (distance * 0.1);
              const opacity = isActive ? 1 : 0.6 - (distance * 0.2);
              const translateX = (index - currentIndex) * 320; // Card width + gap
              const zIndex = isActive ? 10 : 5 - distance;

              return (
                <div
                  key={template.id}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity: Math.max(0.3, opacity),
                    zIndex,
                  }}
                >
                  <div className="w-[300px] h-[500px] relative">
                    {/* Card Container with Background */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-premium border-2 border-blue-200 p-4 group">
                      {/* Header */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className={`${getCategoryBadgeColor(template.category)} backdrop-blur-sm`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {template.category}
                        </Badge>
                      </div>

                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                            Premium
                          </Badge>
                        </div>
                      )}

                      {/* Resume Preview with Visible Background */}
                      <div className="w-full h-full relative">
                        {template.templateSchema && template.sampleData ? (
                          <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" style={{ maxWidth: '80%', margin: '0 auto' }}>
                            <TemplateCardPreview 
                              template={template.templateSchema} 
                              data={template.sampleData} 
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <div className="text-center">
                              <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryGradient(template.category)} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                                <Sparkles className="w-8 h-8 text-white" />
                              </div>
                              <p className="text-sm text-slate-500">Preview Loading...</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-premium border border-white/20">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-hover rounded-xl flex items-center justify-center">
                                  <Eye className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-heading font-semibold text-slate-900 text-sm">{template.name}</h4>
                                  <p className="text-xs text-slate-600">{template.category} Template</p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onPreview?.(template.id)}
                                  className="flex-1 bg-white/90 hover:bg-white text-slate-900 border-white/20"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => onUse?.(template.id)}
                                  className={`flex-1 bg-gradient-to-r ${getCategoryGradient(template.category)} hover:opacity-90 text-white shadow-lg`}
                                >
                                  Use Template
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-white/90">
                              <ArrowUpRight className="w-4 h-4" />
                              <span className="text-sm font-medium">Click to interact</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {templates.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Template Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
          <h3 className="font-heading font-bold text-lg text-slate-900">
            {templates[currentIndex]?.name}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {templates[currentIndex]?.description}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            {templates[currentIndex]?.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="text-right text-slate-600">
          <div className="text-sm font-medium">
            {currentIndex + 1} of {templates.length}
          </div>
          <div className="text-xs">Templates</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
