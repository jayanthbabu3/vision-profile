import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PremiumTemplateCarousel from "./PremiumTemplateCarousel";
import { templateRegistry } from "@/lib/template-registry";
// Import to ensure templates are registered
import "@/lib/template-schemas";

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
}

const CategoryTemplatesView = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get all templates and convert to our format
  const allTemplates: Template[] = useMemo(() => {
    return templateRegistry.getAllTemplates().map(template => ({
      id: template.id,
      name: template.name,
      category: template.category,
      image: getTemplateImage(template.category, template.id)
    }));
  }, []);

  function getTemplateImage(category: string, id: string) {
    return "/assets/resume-template.png";
  }

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allTemplates.map(t => t.category)));
    return ["All", ...cats];
  }, [allTemplates]);

  // Filter templates by category
  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "All") return allTemplates;
    return allTemplates.filter(t => t.category === selectedCategory);
  }, [allTemplates, selectedCategory]);

  // Category to role mapping for better UX
  const categoryRoles: Record<string, string[]> = {
    "Professional": ["Software Engineer", "Product Manager", "Marketing Manager"],
    "Creative": ["Designer", "Content Creator", "Artist"],
    "Academic": ["Teacher", "Researcher", "Professor"],
    "Business": ["Sales Manager", "Business Analyst", "Consultant"],
    "Healthcare": ["Nurse", "Doctor", "Medical Assistant"],
    "Technical": ["Data Scientist", "DevOps Engineer", "System Administrator"]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Resume Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Choose from our collection of professional resume templates designed for different industries and career levels.
          </p>
          
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background hover:bg-accent hover:text-accent-foreground border-border"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Role suggestions for selected category */}
          {selectedCategory !== "All" && categoryRoles[selectedCategory] && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground mr-2">Perfect for:</span>
              {categoryRoles[selectedCategory].map((role, index) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Templates Carousel */}
      <PremiumTemplateCarousel 
        templates={filteredTemplates}
        title={selectedCategory === "All" ? "All Templates" : `${selectedCategory} Templates`}
        subtitle={`${filteredTemplates.length} professional templates available${selectedCategory !== "All" ? ` for ${selectedCategory.toLowerCase()} roles` : ""}`}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-4xl font-bold text-primary mb-2">
                {allTemplates.length}+
              </div>
              <div className="text-muted-foreground">
                Professional Templates
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-4xl font-bold text-primary mb-2">
                {categories.length - 1}
              </div>
              <div className="text-muted-foreground">
                Industry Categories
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-4xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-muted-foreground">
                ATS Compatible
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryTemplatesView;