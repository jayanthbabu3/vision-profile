import React from "react";
import { TemplateSchema, SampleResumeData } from "@/lib/template-schemas";

interface TemplateRendererProps {
  template: TemplateSchema;
  data: SampleResumeData;
  className?: string;
}

// Block type definitions for extensibility
export interface BlockRenderer {
  type: string;
  render: (props: RenderBlockProps) => React.ReactElement | null;
}

interface RenderBlockProps {
  block: any;
  data: any;
  theme: TemplateSchema;
}

// Custom block renderers registry
const customBlockRenderers = new Map<string, BlockRenderer>();

// Register a custom block renderer
export const registerBlockRenderer = (renderer: BlockRenderer) => {
  customBlockRenderers.set(renderer.type, renderer);
};

// Unregister a custom block renderer
export const unregisterBlockRenderer = (type: string) => {
  customBlockRenderers.delete(type);
};

// Get all registered block types
export const getRegisteredBlockTypes = (): string[] => {
  return [
    'vstack', 'hstack', 'text', 'divider', 'spacer', 'section', 'list', 'container', 'grid', 'card'
  ].concat(Array.from(customBlockRenderers.keys()));
};

// Utility functions for template rendering
const px = (n: number | undefined): string | undefined => 
  typeof n === "number" ? `${n}px` : undefined;

function getPath(obj: any, path: string): any {
  if (!path) return undefined;
  if (path === ".") return obj["."] ?? obj; // current item in list
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

// Enhanced interpolation with more pipe functions
function interpolate(template: string, data: any): string {
  if (typeof template !== "string") return "";
  return template.replace(/{{\s*([^}]+)\s*}}/g, (_, expr) => {
    // Parse pipe syntax: path|function:arg1:arg2
    const parts = expr.split("|");
    const path = parts[0].trim();
    let value = getPath(data, path);

    // Apply pipe functions
    for (let i = 1; i < parts.length; i++) {
      const pipe = parts[i].trim();
      if (pipe.startsWith("join:")) {
        const sep = pipe.substring(5).trim();
        value = Array.isArray(value) ? value.filter(Boolean).join(sep) : "";
      } else if (pipe === "upper") {
        value = String(value || "").toUpperCase();
      } else if (pipe === "lower") {
        value = String(value || "").toLowerCase();
      } else if (pipe === "capitalize") {
        const str = String(value || "");
        value = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      } else if (pipe.startsWith("slice:")) {
        const args = pipe.substring(6).split(":");
        const start = parseInt(args[0]) || 0;
        const end = args[1] ? parseInt(args[1]) : undefined;
        value = String(value || "").slice(start, end);
      }
    }

    return value == null ? "" : String(value);
  });
}

function truthy(expr: string | undefined, data: any): boolean {
  if (!expr) return true;
  if (expr.endsWith(".length")) {
    const v = getPath(data, expr.replace(/\.length$/, ""));
    return Array.isArray(v) && v.length > 0;
  }
  const v = getPath(data, expr);
  return !!v;
}

function styleMap(style: any, theme: TemplateSchema): React.CSSProperties {
  if (!style) return {};
  
  // Enhanced color mapping
  const color = style.color === "primary" 
    ? theme.colors?.primary 
    : style.color === "muted" 
    ? theme.colors?.muted 
    : style.color === "text"
    ? theme.colors?.text
    : style.color; // Allow custom colors
  
  const obj: React.CSSProperties = {
    fontFamily: style.font === "heading" ? theme.fonts?.heading : theme.fonts?.body,
    fontWeight: style.weight,
    fontSize: px(style.size),
    color,
    textAlign: style.align,
    marginTop: px(style.mt),
    marginBottom: px(style.mb),
    marginLeft: px(style.ml),
    marginRight: px(style.mr),
    paddingTop: px(style.pt),
    paddingBottom: px(style.pb),
    paddingLeft: px(style.pl),
    paddingRight: px(style.pr),
    padding: style.padding,
    gap: px(style.gap),
    alignItems: style.alignItems,
    justifyContent: style.justifyContent,
    backgroundColor: style.backgroundColor || style.background,
    border: style.border,
    borderRadius: px(style.borderRadius),
    lineHeight: style.lineHeight,
    textDecoration: style.textDecoration,
    textTransform: style.textTransform,
    letterSpacing: px(style.letterSpacing),
    display: style.display,
    flexDirection: style.flexDirection,
    flexWrap: style.flexWrap,
    gridTemplateColumns: style.gridTemplateColumns,
    gridGap: px(style.gridGap),
    width: style.width,
    height: style.height,
    minHeight: style.minHeight,
    maxWidth: style.maxWidth,
    overflow: style.overflow,
    position: style.position,
    top: px(style.top),
    left: px(style.left),
    right: px(style.right),
    bottom: px(style.bottom),
    zIndex: style.zIndex,
    opacity: style.opacity,
    transform: style.transform,
    boxShadow: style.boxShadow,
  };
  
  // Remove undefined values
  Object.keys(obj).forEach((k) => {
    if (obj[k as keyof React.CSSProperties] === undefined) {
      delete obj[k as keyof React.CSSProperties];
    }
  });
  
  return obj;
}

interface RenderBlockProps {
  block: any;
  data: any;
  theme: TemplateSchema;
}

function RenderBlock({ block, data, theme }: RenderBlockProps): React.ReactElement | null {
  if (!block || typeof block !== 'object') return null;
  
  // Handle showIf condition
  if (!truthy(block.showIf, data)) return null;
  
  const common = { style: styleMap(block.style, theme) };

  // Handle different schema formats - layout can be array or single block
  if (Array.isArray(block)) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {block.map((childBlock, i) => (
          <RenderBlock key={i} block={childBlock} data={data} theme={theme} />
        ))}
      </div>
    );
  }

  // Check for custom renderer first
  const customRenderer = customBlockRenderers.get(block.type);
  if (customRenderer) {
    return customRenderer.render({ block, data, theme });
  }

  switch (block.type) {
    case "container":
      return (
        <div style={{ ...common.style }}>
          {block.child && (
            <RenderBlock block={block.child} data={data} theme={theme} />
          )}
          {block.children && block.children.map((child: any, i: number) => (
            <RenderBlock key={i} block={child} data={data} theme={theme} />
          ))}
        </div>
      );

    case "vstack":
      return (
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: px(block.gap ?? 12), 
            alignItems: block.alignItems || "stretch",
            ...common.style 
          }}
        >
          {block.children?.map((child: any, i: number) => (
            <RenderBlock key={i} block={child} data={data} theme={theme} />
          ))}
        </div>
      );

    case "hstack":
      if (block.columns) {
        // Grid-based hstack
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: block.columns.map((c: any) => `${c.width}fr`).join(" "),
              gap: px(block.gap ?? 12),
              ...common.style,
            }}
          >
            {block.columns.map((col: any, i: number) => (
              <RenderBlock key={i} block={col.child} data={data} theme={theme} />
            ))}
          </div>
        );
      } else {
        // Flex-based hstack
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: px(block.gap ?? 12),
              alignItems: block.alignItems || "stretch",
              ...common.style,
            }}
          >
            {block.children?.map((child: any, i: number) => (
              <RenderBlock key={i} block={child} data={data} theme={theme} />
            ))}
          </div>
        );
      }

    case "text":
      return (
        <div style={common.style}>
          {interpolate(block.text || block.content || "", data)}
        </div>
      );

    case "divider":
      return (
        <div 
          style={{ 
            borderTop: `1px solid ${theme.colors?.divider || "#e5e7eb"}`, 
            margin: "4px 0" 
          }} 
        />
      );

    case "spacer":
      return (
        <div style={{ height: px(block.height) }} />
      );

    case "section":
      return (
        <div style={common.style}>
          {block.label && (
            <div style={styleMap(block.labelStyle, theme)}>
              {block.label}
            </div>
          )}
          {block.child && (
            <RenderBlock block={block.child} data={data} theme={theme} />
          )}
          {block.children && block.children.map((child: any, i: number) => (
            <RenderBlock key={i} block={child} data={data} theme={theme} />
          ))}
        </div>
      );

    case "list": {
      const arr = getPath(data, block.from);
      if (!arr || !Array.isArray(arr) || arr.length === 0) return null;
      return (
        <div style={common.style}>
          {arr.map((item: any, i: number) => (
            <RenderBlock 
              key={i} 
              block={block.item} 
              data={{ ...data, ".": item, ...item }} 
              theme={theme} 
            />
          ))}
        </div>
      );
    }

    case "grid":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: block.columns || "repeat(auto-fit, minmax(200px, 1fr))",
            gap: px(block.gap ?? 12),
            ...common.style,
          }}
        >
          {block.children?.map((child: any, i: number) => (
            <RenderBlock key={i} block={child} data={data} theme={theme} />
          ))}
        </div>
      );

    case "card":
      return (
        <div 
          style={{ 
            border: `1px solid ${theme.colors?.divider || "#e5e7eb"}`,
            borderRadius: "8px",
            padding: "16px",
            ...common.style 
          }}
        >
          {block.children?.map((child: any, i: number) => (
            <RenderBlock key={i} block={child} data={data} theme={theme} />
          ))}
        </div>
      );

    default:
      // Fallback for unknown block types - try to render as a simple container
      console.warn(`Unknown block type: ${block.type}`, block);
      if (block.children) {
        return (
          <div style={common.style}>
            {block.children.map((child: any, i: number) => (
              <RenderBlock key={i} block={child} data={data} theme={theme} />
            ))}
          </div>
        );
      }
      if (block.child) {
        return (
          <div style={common.style}>
            <RenderBlock block={block.child} data={data} theme={theme} />
          </div>
        );
      }
      return null;
  }
}

export default function TemplateRenderer({ 
  template, 
  data, 
  className = "" 
}: TemplateRendererProps): React.ReactElement {
  // Handle different template formats
  const pageWidth = template.page?.size === "A4" ? 794 : 816; // approx px at 96DPI
  const margins = template.page?.margins || 20;
  const fontFamily = template.fonts?.body || "Inter, system-ui";
  const textColor = template.colors?.text || "#374151";
  
  // Ensure we have valid layout
  if (!template.layout) {
    console.error("Template missing layout:", template);
    return (
      <div className={`bg-white shadow-lg rounded-xl border p-8 ${className}`}>
        <div className="text-red-500">Template layout not found</div>
      </div>
    );
  }
  
  return (
    <div
      className={`bg-white shadow-lg rounded-xl border ${className}`}
      style={{
        width: pageWidth,
        padding: margins,
        fontFamily,
        color: textColor,
        lineHeight: 1.4,
        // Ensure content scales properly within the container
        maxWidth: '100%',
        boxSizing: 'border-box',
        // Ensure the resume doesn't fill the entire container
        height: 'auto',
        minHeight: 'fit-content',
      }}
    >
      <RenderBlock block={template.layout} data={data} theme={template} />
    </div>
  );
}
