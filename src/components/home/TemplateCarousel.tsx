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
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
              Premium Templates
            </h2>
            <p className="text-xl text-slate-600">
              Professional, ATS-optimized designs for every role
            </p>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
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
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
              >
                <div className="card-template hover-lift group">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Quick Preview
                      </Button>
                    </div>

                    {/* Premium Badge */}
                    {template.isPremium && (
                      <div className="absolute top-3 right-3">
                        <div className="badge-premium">
                          <Crown className="w-3 h-3" />
                          Premium
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {template.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Preview
                      </Button>
                      <button className="btn-hero flex-1 text-sm py-2">
                        Use Template
                      </button>
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