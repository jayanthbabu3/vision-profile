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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {displayTemplates.map((template) => (
                <CarouselItem key={template.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div 
                    className="cursor-pointer group"
                    onClick={() => handleTemplateClick(template.id)}
                  >
                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                        <img 
                          src={template.image}
                          alt={`${template.name} template`}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 bg-white border border-gray-300 hover:bg-gray-50 shadow-lg rounded-full" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 bg-white border border-gray-300 hover:bg-gray-50 shadow-lg rounded-full" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PremiumTemplateCarousel;