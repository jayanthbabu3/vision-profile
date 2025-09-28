import React, { useCallback } from "react";
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
  title,
  subtitle
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
    <section className="py-20 bg-gradient-to-br from-background via-primary/15 to-background">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="mb-14 text-center">
            {title && (
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carousel */}
        <div className="relative mx-auto max-w-6xl">
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
                     {/* Simplified gradient border structure */}
                     <div className="relative">
                       {/* Gradient border background */}
                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 via-accent/20 to-primary/10"></div>
                       {/* Content with gradient background and margin for border */}
                       <div className="relative m-[2px] rounded-2xl bg-gradient-to-br from-card via-primary/15 to-accent/10 backdrop-blur-sm shadow-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl">
                         <div className="p-4">
                           <div className="aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted">
                             <img 
                               src={template.image}
                               alt={`${template.name} template`}
                               className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                             />
                           </div>
                           <div className="mt-3 text-center text-sm font-medium text-foreground">
                             {template.name}
                           </div>
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
