import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TemplateCard, { TemplateCardProps } from "./TemplateCard";
import SimplePreviewModal from "./SimplePreviewModal";
import { useNavigate } from "react-router-dom";
import { getAllTemplates, templateRegistry } from "@/lib/template-registry";
import "@/lib/template-schemas"; // Import to register templates

// Convert template definitions to TemplateCardProps format
const convertToTemplateCardProps = (def: any): TemplateCardProps => ({
  id: def.id,
  name: def.name,
  description: def.description,
  category: def.category,
  tags: def.tags,
  isPremium: def.isPremium,
  previewUrl: def.previewUrl || `/assets/template-${def.category.toLowerCase()}.jpg`,
  templateUrl: null,
  isActive: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
  sections: [
    { id: "1", name: "Header", order: 1, isRequired: true, config: {} },
    { id: "2", name: "Summary", order: 2, isRequired: false, config: {} },
    { id: "3", name: "Experience", order: 3, isRequired: true, config: {} },
    { id: "4", name: "Education", order: 4, isRequired: true, config: {} },
    { id: "5", name: "Skills", order: 5, isRequired: true, config: {} },
  ],
  // Add template schema and sample data for preview
  templateSchema: def.schema,
  sampleData: def.sampleData,
});

// Get all templates from registry
const allTemplates = getAllTemplates();
const templates: TemplateCardProps[] = allTemplates.map(convertToTemplateCardProps);

// Get categories from registry
const registryCategories = templateRegistry.getCategories();
const categories = ["All", ...registryCategories];

const TemplatesContainer = () => {
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState<TemplateCardProps[]>(templates);
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateCardProps[]>(templates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCardProps | null>(null);
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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl mb-2">
                Resume Templates
              </h1>
              <p className="text-slate-600">
                Choose from our collection of professionally designed, ATS-friendly resume templates
              </p>
            </div>
            
            {/* Stats */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-slate-500">Templates</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category === "All" ? "All Templates" : category}
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-slate-600">
            Showing {filteredTemplates.length} of {templateList.length} templates
          </p>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                {...template}
                onPreview={handlePreview}
                onUse={handleUse}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">No templates found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Preview Modal */}
        <SimplePreviewModal
          template={previewTemplate}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onUse={handleUse}
        />
      </div>
    </div>
  );
};

export default TemplatesContainer;
