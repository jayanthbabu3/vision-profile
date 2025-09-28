import React, { useEffect, useRef, useState } from "react";
import TemplateRenderer from "@/components/resume/TemplateRenderer";
import { SampleResumeData, TemplateSchema } from "@/lib/template-schemas";
import { Eye, Sparkles, ArrowUpRight } from "lucide-react";

interface TemplateCardPreviewProps {
  template: TemplateSchema;
  data: SampleResumeData;
}

// Premium resume preview with modern design and enhanced UX
export default function TemplateCardPreview({ template, data }: TemplateCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [isHovered, setIsHovered] = useState(false);

  // Update container width when it changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const width = container.clientWidth;
      // Responsive width calculation based on screen size
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      let padding = 80; // Much larger padding to show background
      if (isMobile) padding = 60;
      else if (isTablet) padding = 70;
      
      // Make the resume much smaller to show background
      setContainerWidth(Math.max(200, width - padding));
    };

    // Initial measurement
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    // Also listen to window resize for responsive updates
    window.addEventListener('resize', updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-gradient-to-br from-white to-slate-50/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Main Content Container */}
      <div className="relative w-full h-full flex flex-col">
        {/* Elegant Header with Template Info */}
        <div className="flex-shrink-0 p-4 border-b border-slate-200/40 bg-gradient-to-r from-white/95 via-slate-50/90 to-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary to-primary-hover rounded-full animate-pulse shadow-sm" />
              <span className="text-xs font-semibold text-slate-700 bg-slate-100/60 px-2 py-1 rounded-full">Live Preview</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-medium bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-1 rounded-full border border-amber-200/50">Premium</span>
            </div>
          </div>
        </div>

        {/* Resume Preview Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Scrollable Content */}
          <div className="relative w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent hover:scrollbar-thumb-slate-400/70 transition-colors">
            <div className="p-4 flex justify-center">
              <TemplateRenderer
                template={{
                  ...template,
                  // Optimized for card preview
                  page: { 
                    ...template.page, 
                    margins: Math.max(8, (template.page?.margins ?? 20) * 0.4),
                    size: "A4"
                  },
                }}
                data={data}
                className="relative bg-white border-0 shadow-none rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>

        {/* Elegant Interactive Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-800/20 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">Interactive Preview</h4>
                    <p className="text-sm text-slate-600 mt-1">Scroll to explore the full template design</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/95 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <ArrowUpRight className="w-5 h-5" />
                <span className="text-sm font-semibold">Hover to interact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50/98 via-slate-50/60 to-transparent pointer-events-none" />
        
        {/* Subtle Corner Accents */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-primary/40 rounded-full" />
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/40 rounded-full" />
      </div>
    </div>
  );
}
