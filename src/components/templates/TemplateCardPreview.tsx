import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TemplateRenderer from "@/components/resume/TemplateRenderer";
import { SampleResumeData, TemplateSchema } from "@/lib/template-schemas";

interface TemplateCardPreviewProps {
  template: TemplateSchema;
  data: SampleResumeData;
}

// Fits a full TemplateRenderer page perfectly inside its parent (the card area),
// maintaining aspect ratio and centering it.
export default function TemplateCardPreview({ template, data }: TemplateCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Measure and compute scale to fit
  const recompute = () => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Reset transforms to measure natural content size
    content.style.transform = "none";
    
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    // Force a layout recalculation and get the natural size
    const iw = content.scrollWidth;
    const ih = content.scrollHeight;

    if (iw <= 0 || ih <= 0) return;

    // Calculate scale to fit both width and height
    const scaleX = cw / iw;
    const scaleY = ch / ih;
    const nextScale = Math.min(scaleX, scaleY);

    // Calculate scaled dimensions
    const scaledW = iw * nextScale;
    const scaledH = ih * nextScale;

    // Center the scaled content
    const ox = (cw - scaledW) / 2;
    const oy = (ch - scaledH) / 2;

    setScale(nextScale);
    setOffset({ x: ox, y: oy });
  };

  useLayoutEffect(() => {
    recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const ro1 = new ResizeObserver(() => recompute());
    const ro2 = new ResizeObserver(() => recompute());
    ro1.observe(container);
    ro2.observe(content);

    return () => {
      ro1.disconnect();
      ro2.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <div
        ref={contentRef}
        className="absolute will-change-transform pointer-events-none"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <TemplateRenderer
          template={{
            ...template,
            // Reduce margins slightly for better legibility in small previews
            page: { ...template.page, margins: Math.max(8, (template.page?.margins ?? 20) - 4) },
          }}
          data={data}
          className="border-0 shadow-none rounded-none"
        />
      </div>
    </div>
  );
}
