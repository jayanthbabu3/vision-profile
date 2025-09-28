// Custom Block Renderers
// This file demonstrates how to create custom block types for templates

import React from 'react';
import { registerBlockRenderer, BlockRenderer } from '@/components/resume/TemplateRenderer';
import { TemplateSchema } from './template-schemas';

// Utility functions
const px = (n: number | undefined): string | undefined => 
  typeof n === "number" ? `${n}px` : undefined;

function styleMap(style: any, theme: TemplateSchema): React.CSSProperties {
  if (!style) return {};
  
  const color = style.color === "primary" 
    ? theme.colors?.primary 
    : style.color === "muted" 
    ? theme.colors?.muted 
    : style.color === "text"
    ? theme.colors?.text
    : style.color;
  
  return {
    fontFamily: style.font === "heading" ? theme.fonts?.heading : theme.fonts?.body,
    fontWeight: style.weight,
    fontSize: px(style.size),
    color,
    textAlign: style.align,
    marginTop: px(style.mt),
    marginBottom: px(style.mb),
    padding: style.padding,
    backgroundColor: style.backgroundColor || style.background,
    ...style
  };
}

// Simple Badge Block
const badgeRenderer: BlockRenderer = {
  type: "badge",
  render: ({ block, data, theme }) => {
    const text = block.text || "";
    const variant = block.variant || "default";
    
    let backgroundColor = theme.colors?.muted || "#6B7280";
    let color = "#ffffff";
    
    if (variant === "primary") {
      backgroundColor = theme.colors?.primary || "#7c3aed";
    }
    
    return React.createElement('span', {
      style: {
        display: "inline-block",
        padding: "4px 8px",
        backgroundColor,
        color,
        borderRadius: "12px",
        fontSize: "10px",
        fontWeight: 600,
        ...styleMap(block.style, theme)
      }
    }, text);
  }
};

// Register custom block renderers
export const registerCustomBlocks = () => {
  registerBlockRenderer(badgeRenderer);
  console.log("Custom block renderers registered");
};

// Auto-register custom blocks
registerCustomBlocks();
