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

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface PremiumTemplateCarouselProps {
  templates: Template[];
  title?: string;
  subtitle?: string;
}

const PremiumTemplateCarousel = ({ 
  templates, 
  title = "Choose Your Perfect Template",
  subtitle = "Professional resume templates designed to get you hired"
}: PremiumTemplateCarouselProps) => {
  const navigate = useNavigate();

  const handleTemplateClick = useCallback((templateId: string) => {
    navigate(`/resume/${templateId}`);
  }, [navigate]);

  const getTemplateImage = (template: Template) => {
    if (template.id === 'classic' || template.category.toLowerCase() === 'classic') {
      return "/assets/template-classic.jpg";
    } else if (template.id === 'modern' || template.category.toLowerCase() === 'modern') {
      return "/assets/template-modern.jpg";
    } else if (template.id === 'creative' || template.category.toLowerCase() === 'creative') {
      return "/assets/template-creative.jpg";
    } else {
      return "/assets/resume-template.png";
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {templates.map((template) => (
                <CarouselItem key={template.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card 
                    className="group cursor-pointer overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                    onClick={() => handleTemplateClick(template.id)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img 
                        src={getTemplateImage(template)}
                        alt={`${template.name} template`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Template Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                          {template.name}
                        </h3>
                        <p className="text-sm text-white/80 drop-shadow-md">
                          {template.category}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-background border-2 border-border hover:bg-accent hover:border-accent-foreground shadow-lg" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-background border-2 border-border hover:bg-accent hover:border-accent-foreground shadow-lg" />
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => navigate('/templates')}
          >
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumTemplateCarousel;