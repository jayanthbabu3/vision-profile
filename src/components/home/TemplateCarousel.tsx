import { useState } from "react";
import { Eye, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import templateModern from "@/assets/template-modern.jpg";
import templateClassic from "@/assets/template-classic.jpg";
import templateCreative from "@/assets/template-creative.jpg";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    image: templateModern,
    tags: ["Modern", "ATS-friendly", "Clean"],
    isPremium: false,
    description: "Clean, minimal design with modern typography. Perfect for tech and creative roles.",
  },
  {
    id: 2,
    name: "Executive Classic",
    image: templateClassic,
    tags: ["Classic", "Traditional", "Executive"],
    isPremium: true,
    description: "Traditional, professional layout ideal for senior positions and corporate roles.",
  },
  {
    id: 3,
    name: "Creative Edge",
    image: templateCreative,
    tags: ["Creative", "Modern", "Unique"],
    isPremium: true,
    description: "Contemporary design with subtle creative elements while maintaining professionalism.",
  },
  {
    id: 4,
    name: "Tech Minimalist",
    image: templateModern,
    tags: ["Minimal", "Tech", "ATS-friendly"],
    isPremium: false,
    description: "Ultra-clean design optimized for technical roles and modern companies.",
  },
  {
    id: 5,
    name: "Healthcare Pro",
    image: templateClassic,
    tags: ["Professional", "Healthcare", "Clean"],
    isPremium: true,
    description: "Professional design tailored for healthcare and medical professionals.",
  },
  {
    id: 6,
    name: "Business Elite",
    image: templateCreative,
    tags: ["Business", "Elite", "Modern"],
    isPremium: true,
    description: "Premium design for business professionals and consultants.",
  },
];

const TemplateCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, templates.length - itemsPerView);

  const next = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 relative">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Crown className="w-4 h-4" />
            Premium Collection
          </div>
          
          <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-6 text-gradient animate-fade-in">
            Premium Templates
          </h2>
          <p className="text-base text-slate-500 max-w-3xl mx-auto animate-fade-in">
            Professional, ATS-optimized designs crafted for every role and industry
          </p>

          {/* Navigation - Moved below header */}
          <div className="hidden md:flex items-center justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-12 h-12 p-0 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-surface/60 backdrop-blur-sm rounded-full border">
              {Array.from({ length: Math.ceil(templates.length / itemsPerView) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 p-0 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <div className="group relative">
                  {/* Premium Card with Enhanced Design */}
                  <div className="card-premium hover-lift group/card cursor-pointer relative overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Premium Overlay with Glassmorphism */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="transform translate-y-8 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 border-0 shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Quick Preview
                          </Button>
                        </div>
                      </div>

                      {/* Enhanced Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm animate-pulse">
                            <Crown className="w-3.5 h-3.5" />
                            Premium
                          </div>
                        </div>
                      )}

                      {/* Corner Decoration */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full opacity-60"></div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 bg-gradient-to-br from-card via-card to-card/95">
                      <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover/card:text-primary transition-colors duration-300">
                        {template.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Enhanced Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {template.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Premium Action Buttons */}
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                        >
                          Preview
                        </Button>
                        <button className="btn-hero flex-1 text-sm py-2.5 px-4 relative overflow-hidden group/btn">
                          <span className="relative z-10">Use Template</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={next}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Templates
          </button>
        </div>
      </div>

      {/* Preview Modal - Simple version for now */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface rounded-2xl p-6 max-w-lg w-full">
            <h3 className="font-heading font-semibold text-xl mb-2">
              {selectedTemplate.name}
            </h3>
            <p className="text-slate-600 mb-4">
              {selectedTemplate.description}
            </p>
            <div className="flex gap-3">
              <button className="btn-hero flex-1">
                Use This Template
              </button>
              <Button
                variant="outline"
                onClick={() => setSelectedTemplate(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TemplateCarousel;