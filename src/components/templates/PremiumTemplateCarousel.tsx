import React, { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { templateRegistry } from "@/lib/template-registry";
// Import to ensure templates are registered
import "@/lib/template-schemas";

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface PremiumTemplateCarouselProps {
  templates?: Template[];
  title?: string;
  subtitle?: string;
}

const PremiumTemplateCarousel = ({ 
  templates, 
  title = "Choose Your Perfect Template",
  subtitle = "Professional resume templates designed to get you hired"
}: PremiumTemplateCarouselProps) => {
  const navigate = useNavigate();

  // Get templates from registry if not provided
  const displayTemplates = templates || templateRegistry.getAllTemplates().map(template => ({
    id: template.id,
    name: template.name,
    category: template.category,
    image: getTemplateImage(template.category, template.id)
  }));

  const handleTemplateClick = useCallback((templateId: string) => {
    navigate(`/resume/${templateId}`);
  }, [navigate]);

  function getTemplateImage(category: string, id: string) {
    return "/assets/resume-template.png";
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {displayTemplates.map((template, index) => (
                <CarouselItem key={template.id} className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div 
                    className="cursor-pointer group"
                    onClick={() => handleTemplateClick(template.id)}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/60 group-hover:scale-[1.02]">
                      <div className="p-4">
                        <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                          <img 
                            src={template.image}
                            alt={`${template.name} template`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows - Hidden on mobile */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 backdrop-blur-sm border border-white/60 hover:bg-white shadow-xl rounded-full hidden md:flex" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 backdrop-blur-sm border border-white/60 hover:bg-white shadow-xl rounded-full hidden md:flex" />
          </Carousel>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {displayTemplates.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary/60 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumTemplateCarousel;