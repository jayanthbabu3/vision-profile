import { useState, useEffect } from "react";
import { Search, Filter, Grid3X3, Sparkles, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TemplatePreviewCard, { TemplatePreviewCardProps } from "./TemplatePreviewCard";
import SimplePreviewModal from "./SimplePreviewModal";
import { useNavigate } from "react-router-dom";
import { getAllTemplates, templateRegistry } from "@/lib/template-registry";
import "@/lib/template-schemas"; // Import to register templates

// Convert template definitions to TemplatePreviewCardProps format
const convertToTemplatePreviewCardProps = (def: any): TemplatePreviewCardProps => ({
  id: def.id,
  name: def.name,
  description: def.description,
  category: def.category,
  tags: def.tags,
  isPremium: def.isPremium,
  templateSchema: def.schema,
  sampleData: def.sampleData,
});

// Get all templates from registry
const allTemplates = getAllTemplates();
const templates: TemplatePreviewCardProps[] = allTemplates.map(convertToTemplatePreviewCardProps);

// Get categories from registry
const registryCategories = templateRegistry.getCategories();
const categories = ["All", ...registryCategories];

const TemplatesContainer = () => {
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState<TemplatePreviewCardProps[]>(templates);
  const [filteredTemplates, setFilteredTemplates] = useState<TemplatePreviewCardProps[]>(templates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplatePreviewCardProps | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter and search templates
  useEffect(() => {
    let filtered = templateList;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort templates by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredTemplates(filtered);
  }, [templateList, searchQuery, selectedCategory]);

  const handlePreview = (templateId: string) => {
    const template = templateList.find(t => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
      setIsPreviewOpen(true);
    }
  };

  const handleUse = (templateId: string) => {
    // Navigate to resume builder with the selected template
    navigate(`/resume/${templateId}`);
    setIsPreviewOpen(false);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const getTemplateStats = () => {
    const total = templateList.length;
    
    return { total };
  };

  const stats = getTemplateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Premium Resume Templates</span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl lg:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Professional Resume
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Templates</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our collection of expertly designed, ATS-friendly resume templates. 
              <br />
              Each template is crafted to help you land your dream job.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{stats.total}+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-muted-foreground">ATS Compatible</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">5-Star Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search templates by name, style, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" size="lg" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>

            {/* View Toggle */}
            <Button variant="outline" size="lg" className="gap-2">
              <Grid3X3 className="w-4 h-4" />
              Grid View
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 transition-all duration-300 ${
                selectedCategory === category 
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25" 
                  : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              }`}
            >
              {category === "All" ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  All Templates
                </>
              ) : (
                category
              )}
            </Button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Templates</h2>
            <Badge variant="secondary" className="bg-muted/50 text-muted-foreground">
              {filteredTemplates.length} of {templateList.length}
            </Badge>
          </div>
          
          {filteredTemplates.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Trending designs</span>
            </div>
          )}
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplatePreviewCard
                key={template.id}
                {...template}
                onPreview={handlePreview}
                onUse={handleUse}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-3">No templates found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any templates matching your criteria. Try adjusting your search or filter settings.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Show All Templates
            </Button>
          </div>
        )}

        {/* Preview Modal */}
        <SimplePreviewModal
          template={previewTemplate ? {
            id: previewTemplate.id,
            name: previewTemplate.name,
            description: previewTemplate.description,
            category: previewTemplate.category,
            tags: previewTemplate.tags,
            isPremium: previewTemplate.isPremium,
            previewUrl: '',
            templateUrl: '',
            createdAt: new Date(),
            templateSchema: previewTemplate.templateSchema,
            sampleData: previewTemplate.sampleData
          } : null}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onUse={handleUse}
        />
      </div>
    </div>
  );
};

export default TemplatesContainer;
