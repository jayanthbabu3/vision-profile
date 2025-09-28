// Schema Utilities
// This file provides utilities for schema management and template discovery

import { TemplateSchema, SampleResumeData, TemplateDefinition } from './template-schemas';
import { validateTemplate, templateRegistry } from './template-registry';

// Schema version management
export const SCHEMA_VERSION = 'v2.0';

// Template schema validator with detailed error reporting
export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export const validateTemplateSchema = (schema: TemplateSchema): SchemaValidationResult => {
  const result: SchemaValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  };

  // Basic validation
  const basicValidation = validateTemplate(schema);
  result.isValid = basicValidation.isValid;
  result.errors = basicValidation.errors;

  // Additional checks and suggestions
  if (!schema.version) {
    result.warnings.push('Schema version not specified - consider adding for future compatibility');
  }

  if (!schema.key || schema.key.length < 3) {
    result.suggestions.push('Consider using a more descriptive schema key');
  }

  // Check for common issues
  if (schema.layout) {
    validateLayoutStructure(schema.layout, result);
  }

  // Color validation
  if (schema.colors) {
    validateColorScheme(schema.colors, result);
  }

  return result;
};

// Validate layout structure recursively
const validateLayoutStructure = (block: any, result: SchemaValidationResult, path: string = 'root'): void => {
  if (!block) return;

  // Check for infinite recursion
  if (path.split('.').length > 10) {
    result.errors.push(`Potential infinite recursion detected at path: ${path}`);
    return;
  }

  // Validate block properties
  if (block.children && !Array.isArray(block.children)) {
    result.errors.push(`Children must be an array at path: ${path}`);
  }

  if (block.columns && !Array.isArray(block.columns)) {
    result.errors.push(`Columns must be an array at path: ${path}`);
  }

  // Recursively validate children
  if (block.children) {
    block.children.forEach((child: any, index: number) => {
      validateLayoutStructure(child, result, `${path}.children[${index}]`);
    });
  }

  if (block.child) {
    validateLayoutStructure(block.child, result, `${path}.child`);
  }

  if (block.columns) {
    block.columns.forEach((column: any, index: number) => {
      if (column.child) {
        validateLayoutStructure(column.child, result, `${path}.columns[${index}].child`);
      }
    });
  }

  if (block.item) {
    validateLayoutStructure(block.item, result, `${path}.item`);
  }
};

// Validate color scheme
const validateColorScheme = (colors: any, result: SchemaValidationResult): void => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'string' && !colorRegex.test(value)) {
      result.warnings.push(`Invalid color format for ${key}: ${value}. Use hex format (e.g., #FF0000)`);
    }
  });

  // Check for accessibility
  if (colors.primary && colors.text) {
    const contrast = calculateContrast(colors.primary, colors.text);
    if (contrast < 4.5) {
      result.suggestions.push('Consider improving color contrast between primary and text colors for better accessibility');
    }
  }
};

// Calculate color contrast ratio
const calculateContrast = (color1: string, color2: string): number => {
  // Simplified contrast calculation - in production, use a proper library
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
};

// Get luminance of a color
const getLuminance = (color: string): number => {
  // Simplified luminance calculation
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const [rs, gs, bs] = [r, g, b].map(c => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Template discovery utilities
export const discoverTemplatePatterns = (templates: TemplateDefinition[]): {
  commonBlocks: string[];
  commonColors: string[];
  commonCategories: string[];
  averageComplexity: number;
} => {
  const blockTypes = new Set<string>();
  const colors = new Set<string>();
  const categories = new Set<string>();
  let totalComplexity = 0;

  templates.forEach(template => {
    categories.add(template.category);
    
    if (template.schema.colors) {
      Object.values(template.schema.colors).forEach(color => {
        if (typeof color === 'string') {
          colors.add(color);
        }
      });
    }

    const complexity = calculateLayoutComplexity(template.schema.layout);
    totalComplexity += complexity;
    
    extractBlockTypes(template.schema.layout, blockTypes);
  });

  return {
    commonBlocks: Array.from(blockTypes).sort(),
    commonColors: Array.from(colors).sort(),
    commonCategories: Array.from(categories).sort(),
    averageComplexity: templates.length > 0 ? totalComplexity / templates.length : 0
  };
};

// Calculate layout complexity
const calculateLayoutComplexity = (layout: any): number => {
  if (!layout) return 0;
  
  let complexity = 1;
  
  if (layout.children) {
    complexity += layout.children.length;
    layout.children.forEach((child: any) => {
      complexity += calculateLayoutComplexity(child);
    });
  }
  
  if (layout.child) {
    complexity += calculateLayoutComplexity(layout.child);
  }
  
  if (layout.columns) {
    complexity += layout.columns.length;
    layout.columns.forEach((column: any) => {
      if (column.child) {
        complexity += calculateLayoutComplexity(column.child);
      }
    });
  }
  
  if (layout.item) {
    complexity += calculateLayoutComplexity(layout.item);
  }
  
  return complexity;
};

// Extract all block types from a layout
const extractBlockTypes = (layout: any, blockTypes: Set<string>): void => {
  if (!layout) return;
  
  if (layout.type) {
    blockTypes.add(layout.type);
  }
  
  if (layout.children) {
    layout.children.forEach((child: any) => extractBlockTypes(child, blockTypes));
  }
  
  if (layout.child) {
    extractBlockTypes(layout.child, blockTypes);
  }
  
  if (layout.columns) {
    layout.columns.forEach((column: any) => {
      if (column.child) {
        extractBlockTypes(column.child, blockTypes);
      }
    });
  }
  
  if (layout.item) {
    extractBlockTypes(layout.item, blockTypes);
  }
};

// Generate template from template (useful for creating variations)
export const generateTemplateVariation = (
  baseTemplate: TemplateDefinition,
  variations: {
    name?: string;
    colors?: Partial<TemplateSchema['colors']>;
    fonts?: Partial<TemplateSchema['fonts']>;
    category?: string;
  }
): TemplateDefinition => {
  const newSchema: TemplateSchema = {
    ...baseTemplate.schema,
    key: `${baseTemplate.schema.key}-variant-${Date.now()}`,
    name: variations.name || `${baseTemplate.name} (Variant)`,
    colors: { ...baseTemplate.schema.colors, ...variations.colors },
    fonts: { ...baseTemplate.schema.fonts, ...variations.fonts },
  };

  return {
    ...baseTemplate,
    id: `${baseTemplate.id}-variant-${Date.now()}`,
    name: variations.name || `${baseTemplate.name} (Variant)`,
    category: variations.category || baseTemplate.category,
    schema: newSchema,
  };
};

// Export template schema to JSON
export const exportTemplateSchema = (template: TemplateDefinition): string => {
  return JSON.stringify({
    template: {
      id: template.id,
      name: template.name,
      category: template.category,
      description: template.description,
      tags: template.tags,
      isPremium: template.isPremium,
    },
    schema: template.schema,
    sampleData: template.sampleData,
    exportedAt: new Date().toISOString(),
    version: SCHEMA_VERSION,
  }, null, 2);
};

// Import template schema from JSON
export const importTemplateSchema = (jsonString: string): TemplateDefinition => {
  try {
    const data = JSON.parse(jsonString);
    
    if (!data.template || !data.schema) {
      throw new Error('Invalid template format: missing template or schema data');
    }
    
    // Validate the imported schema
    const validation = validateTemplateSchema(data.schema);
    if (!validation.isValid) {
      throw new Error(`Invalid schema: ${validation.errors.join(', ')}`);
    }
    
    return {
      id: data.template.id || `imported-${Date.now()}`,
      name: data.template.name || 'Imported Template',
      description: data.template.description || null,
      category: data.template.category || 'Imported',
      tags: data.template.tags || [],
      isPremium: data.template.isPremium || false,
      previewUrl: null,
      schema: data.schema,
      sampleData: data.sampleData || {},
    };
  } catch (error) {
    throw new Error(`Failed to import template: ${error}`);
  }
};

// Get template statistics
export const getTemplateStatistics = () => {
  const templates = templateRegistry.getAllTemplates();
  const patterns = discoverTemplatePatterns(templates);
  
  return {
    totalTemplates: templates.length,
    totalCategories: patterns.commonCategories.length,
    totalBlockTypes: patterns.commonBlocks.length,
    averageComplexity: patterns.averageComplexity,
    categories: patterns.commonCategories,
    blockTypes: patterns.commonBlocks,
    colors: patterns.commonColors,
  };
};
