// Dynamic Template Registry System
// This file provides a centralized way to manage and discover template schemas

import { TemplateSchema, SampleResumeData, TemplateDefinition } from './template-schemas';

// Template registry interface
export interface TemplateRegistry {
  templates: Map<string, TemplateDefinition>;
  schemas: Map<string, TemplateSchema>;
  sampleData: Map<string, SampleResumeData>;
}

// Global template registry instance
class TemplateRegistryManager {
  private registry: TemplateRegistry = {
    templates: new Map(),
    schemas: new Map(),
    sampleData: new Map(),
  };

  // Register a complete template definition
  registerTemplate(definition: TemplateDefinition): void {
    this.registry.templates.set(definition.id, definition);
    this.registry.schemas.set(definition.id, definition.schema);
    this.registry.sampleData.set(definition.id, definition.sampleData);
  }

  // Register a template schema
  registerSchema(id: string, schema: TemplateSchema): void {
    this.registry.schemas.set(id, schema);
  }

  // Register sample data for a template
  registerSampleData(id: string, data: SampleResumeData): void {
    this.registry.sampleData.set(id, data);
  }

  // Get template definition by ID
  getTemplate(id: string): TemplateDefinition | undefined {
    return this.registry.templates.get(id);
  }

  // Get template schema by ID
  getSchema(id: string): TemplateSchema | undefined {
    return this.registry.schemas.get(id);
  }

  // Get sample data by ID
  getSampleData(id: string): SampleResumeData | undefined {
    return this.registry.sampleData.get(id);
  }

  // Get all template definitions
  getAllTemplates(): TemplateDefinition[] {
    return Array.from(this.registry.templates.values());
  }

  // Get templates by category
  getTemplatesByCategory(category: string): TemplateDefinition[] {
    return Array.from(this.registry.templates.values())
      .filter(template => template.category === category);
  }

  // Get all available categories
  getCategories(): string[] {
    const categories = new Set(
      Array.from(this.registry.templates.values())
        .map(template => template.category)
    );
    return Array.from(categories).sort();
  }

  // Check if template exists
  hasTemplate(id: string): boolean {
    return this.registry.templates.has(id);
  }

  // Validate template schema
  validateSchema(schema: TemplateSchema): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields
    if (!schema.version) errors.push('Schema version is required');
    if (!schema.key) errors.push('Schema key is required');
    if (!schema.name) errors.push('Schema name is required');
    if (!schema.page) errors.push('Page configuration is required');
    if (!schema.fonts) errors.push('Font configuration is required');
    if (!schema.colors) errors.push('Color configuration is required');
    if (!schema.layout) errors.push('Layout configuration is required');

    // Validate page configuration
    if (schema.page) {
      if (!schema.page.size) errors.push('Page size is required');
      if (typeof schema.page.margins !== 'number') errors.push('Page margins must be a number');
    }

    // Validate fonts
    if (schema.fonts) {
      if (!schema.fonts.heading) errors.push('Heading font is required');
      if (!schema.fonts.body) errors.push('Body font is required');
    }

    // Validate colors
    if (schema.colors) {
      if (!schema.colors.primary) errors.push('Primary color is required');
      if (!schema.colors.text) errors.push('Text color is required');
      if (!schema.colors.muted) errors.push('Muted color is required');
      if (!schema.colors.divider) errors.push('Divider color is required');
    }

    // Validate layout structure
    if (schema.layout) {
      this.validateLayoutBlock(schema.layout, errors, 'root');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate layout block recursively
  private validateLayoutBlock(block: any, errors: string[], path: string): void {
    if (!block) {
      errors.push(`Layout block is null at path: ${path}`);
      return;
    }

    if (!block.type) {
      errors.push(`Block type is required at path: ${path}`);
      return;
    }

    const validBlockTypes = [
      'vstack', 'hstack', 'text', 'divider', 'spacer', 
      'section', 'list', 'container'
    ];

    if (!validBlockTypes.includes(block.type)) {
      errors.push(`Invalid block type '${block.type}' at path: ${path}`);
    }

    // Validate children for container blocks
    if (['vstack', 'hstack', 'section', 'container'].includes(block.type) && block.children) {
      if (!Array.isArray(block.children)) {
        errors.push(`Children must be an array at path: ${path}`);
      } else {
        block.children.forEach((child: any, index: number) => {
          this.validateLayoutBlock(child, errors, `${path}.children[${index}]`);
        });
      }
    }

    // Validate columns for hstack
    if (block.type === 'hstack' && block.columns) {
      if (!Array.isArray(block.columns)) {
        errors.push(`Columns must be an array at path: ${path}`);
      } else {
        block.columns.forEach((column: any, index: number) => {
          if (!column.width) {
            errors.push(`Column width is required at path: ${path}.columns[${index}]`);
          }
          if (!column.child) {
            errors.push(`Column child is required at path: ${path}.columns[${index}]`);
          } else {
            this.validateLayoutBlock(column.child, errors, `${path}.columns[${index}].child`);
          }
        });
      }
    }

    // Validate list configuration
    if (block.type === 'list') {
      if (!block.from) {
        errors.push(`List 'from' property is required at path: ${path}`);
      }
      if (!block.item) {
        errors.push(`List 'item' property is required at path: ${path}`);
      } else {
        this.validateLayoutBlock(block.item, errors, `${path}.item`);
      }
    }
  }

  // Clear all templates (useful for testing)
  clear(): void {
    this.registry.templates.clear();
    this.registry.schemas.clear();
    this.registry.sampleData.clear();
  }

  // Get registry statistics
  getStats(): {
    totalTemplates: number;
    totalCategories: number;
    categories: string[];
  } {
    const categories = this.getCategories();
    return {
      totalTemplates: this.registry.templates.size,
      totalCategories: categories.length,
      categories
    };
  }
}

// Create and export the global registry instance
export const templateRegistry = new TemplateRegistryManager();

// Utility functions for common operations
export const registerTemplate = (definition: TemplateDefinition) => {
  templateRegistry.registerTemplate(definition);
};

export const getTemplate = (id: string) => {
  return templateRegistry.getTemplate(id);
};

export const getSchema = (id: string) => {
  return templateRegistry.getSchema(id);
};

export const getAllTemplates = () => {
  return templateRegistry.getAllTemplates();
};

export const getTemplatesByCategory = (category: string) => {
  return templateRegistry.getTemplatesByCategory(category);
};

export const getCategories = () => {
  return templateRegistry.getCategories();
};

export const validateTemplate = (schema: TemplateSchema) => {
  return templateRegistry.validateSchema(schema);
};

// Function to load templates from external sources (e.g., API, JSON files)
export const loadTemplatesFromSource = async (source: {
  url?: string;
  data?: TemplateDefinition[];
}): Promise<void> => {
  try {
    let templates: TemplateDefinition[];

    if (source.url) {
      const response = await fetch(source.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch templates: ${response.statusText}`);
      }
      templates = await response.json();
    } else if (source.data) {
      templates = source.data;
    } else {
      throw new Error('Either URL or data must be provided');
    }

    // Validate and register each template
    for (const template of templates) {
      const validation = templateRegistry.validateSchema(template.schema);
      if (!validation.isValid) {
        console.warn(`Template ${template.id} has validation errors:`, validation.errors);
        // Continue anyway, but log the errors
      }
      templateRegistry.registerTemplate(template);
    }

    console.log(`Successfully loaded ${templates.length} templates`);
  } catch (error) {
    console.error('Failed to load templates from source:', error);
    throw error;
  }
};

// Function to create a new template definition
export const createTemplateDefinition = (
  id: string,
  name: string,
  category: string,
  schema: TemplateSchema,
  sampleData: SampleResumeData,
  options: Partial<Omit<TemplateDefinition, 'id' | 'name' | 'category' | 'schema' | 'sampleData'>> = {}
): TemplateDefinition => {
  return {
    id,
    name,
    category,
    schema,
    sampleData,
    description: options.description || `${name} template`,
    tags: options.tags || [],
    isPremium: options.isPremium || false,
    previewUrl: options.previewUrl || null,
  };
};
