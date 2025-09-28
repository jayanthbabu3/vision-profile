# Extensible Template System

This document explains how to use and extend the template system for creating dynamic resume templates.

## Overview

The template system is designed to be:
- **Extensible**: Add new block types and templates dynamically
- **Schema-driven**: Templates are defined using JSON schemas
- **Validated**: Built-in validation ensures templates work correctly
- **Registry-based**: Centralized management of all templates

## Core Components

### 1. Template Registry (`src/lib/template-registry.ts`)

The registry manages all templates and provides utilities for:
- Registering new templates
- Validating schemas
- Discovering templates by category
- Loading templates from external sources

```typescript
import { registerTemplate, getAllTemplates, getCategories } from '@/lib/template-registry';

// Register a new template
registerTemplate(templateDefinition);

// Get all templates
const templates = getAllTemplates();

// Get available categories
const categories = getCategories();
```

### 2. Template Renderer (`src/components/resume/TemplateRenderer.tsx`)

The renderer supports:
- Built-in block types (vstack, hstack, text, etc.)
- Custom block renderers
- Dynamic schema interpretation
- Enhanced styling options

### 3. Custom Blocks (`src/lib/custom-blocks.ts`)

Examples of custom block types:
- `progress`: Progress bars
- `badge`: Styled badges
- `timeline`: Timeline layouts
- `icon`: Icon display
- `quote`: Quote blocks

## Creating New Templates

### Method 1: Using the Helper Function

```typescript
import { createAndRegisterTemplate } from '@/lib/template-schemas';

const newTemplate = createAndRegisterTemplate(
  "template-id",
  "Template Name",
  "Category",
  schemaObject,
  sampleDataObject,
  {
    description: "Template description",
    tags: ["tag1", "tag2"],
    isPremium: false,
  }
);
```

### Method 2: Manual Registration

```typescript
import { registerTemplate } from '@/lib/template-registry';

const templateDefinition: TemplateDefinition = {
  id: "template-id",
  name: "Template Name",
  category: "Category",
  description: "Description",
  tags: ["tag1"],
  isPremium: false,
  previewUrl: null,
  schema: schemaObject,
  sampleData: sampleDataObject,
};

registerTemplate(templateDefinition);
```

## Template Schema Structure

```typescript
interface TemplateSchema {
  version: string;           // Schema version
  key: string;              // Unique identifier
  name: string;             // Display name
  page: {                   // Page configuration
    size: string;           // "A4" or "Letter"
    margins: number;        // Margin in pixels
  };
  fonts: {                  // Typography
    heading: string;        // Heading font family
    body: string;           // Body font family
  };
  colors: {                 // Color scheme
    primary: string;        // Primary color (hex)
    text: string;           // Text color
    muted: string;          // Muted text color
    divider: string;        // Divider color
  };
  layout: any;              // Layout structure
}
```

## Layout Block Types

### Built-in Blocks

1. **vstack** - Vertical stack container
2. **hstack** - Horizontal stack container  
3. **text** - Text content with interpolation
4. **divider** - Horizontal divider line
5. **spacer** - Vertical spacing
6. **section** - Section with optional label
7. **list** - Dynamic list from data
8. **container** - Generic container
9. **grid** - CSS Grid layout
10. **card** - Styled card container

### Creating Custom Blocks

```typescript
import { registerBlockRenderer } from '@/components/resume/TemplateRenderer';

registerBlockRenderer({
  type: "my-custom-block",
  render: ({ block, data, theme }) => {
    return (
      <div style={{ /* custom styling */ }}>
        {/* Custom block content */}
      </div>
    );
  }
});
```

## Text Interpolation

Templates support powerful text interpolation:

```typescript
// Basic interpolation
"{{basics.fullName}}"

// Pipe functions
"{{skills|join: • }}"           // Join array with separator
"{{basics.fullName|upper}}"     // Uppercase
"{{basics.fullName|lower}}"     // Lowercase
"{{basics.fullName|capitalize}}" // Capitalize first letter
"{{summary|slice:0:100}}"       // Slice text

// Conditional display
"{{basics.title}}"              // Only shows if truthy
```

## Conditional Rendering

Use `showIf` to conditionally render blocks:

```typescript
{
  type: "section",
  showIf: "summary",           // Show if summary exists
  child: { /* content */ }
}

{
  type: "section", 
  showIf: "experience.length", // Show if experience array has items
  child: { /* content */ }
}
```

## Styling

Blocks support extensive styling options:

```typescript
{
  type: "text",
  text: "Content",
  style: {
    font: "heading",           // "heading" or "body"
    size: 16,                  // Font size in px
    weight: 600,               // Font weight
    color: "primary",          // "primary", "muted", "text", or hex color
    align: "center",           // Text alignment
    mt: 16,                    // Margin top
    mb: 8,                     // Margin bottom
    pt: 12,                    // Padding top
    pb: 12,                    // Padding bottom
    backgroundColor: "#f0f0f0", // Background color
    border: "1px solid #ccc",  // Border
    borderRadius: 8,           // Border radius
    // ... many more CSS properties
  }
}
```

## Schema Validation

The system includes comprehensive validation:

```typescript
import { validateTemplateSchema } from '@/lib/schema-utils';

const validation = validateTemplateSchema(schema);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

## Loading External Templates

```typescript
import { loadTemplatesFromSource } from '@/lib/template-registry';

// From URL
await loadTemplatesFromSource({
  url: 'https://api.example.com/templates'
});

// From data
await loadTemplatesFromSource({
  data: [templateDefinition1, templateDefinition2]
});
```

## Example: Complete Template

```typescript
const myTemplate: TemplateSchema = {
  version: "v2",
  key: "my-template",
  name: "My Custom Template",
  page: { size: "A4", margins: 24 },
  fonts: { heading: "'Inter', system-ui", body: "'Inter', system-ui" },
  colors: { 
    primary: "#3B82F6", 
    text: "#1F2937", 
    muted: "#6B7280", 
    divider: "#E5E7EB" 
  },
  layout: {
    type: "vstack",
    style: { gap: 20 },
    children: [
      {
        type: "vstack",
        style: { gap: 4 },
        children: [
          { 
            type: "text", 
            text: "{{basics.fullName}}", 
            style: { font: "heading", size: 28, weight: 700 } 
          },
          { 
            type: "text", 
            text: "{{basics.title}}", 
            style: { color: "primary", size: 16 } 
          },
        ],
      },
      {
        type: "section",
        showIf: "summary",
        label: "SUMMARY",
        labelStyle: { weight: 600, size: 14, color: "primary" },
        child: { 
          type: "text", 
          text: "{{summary}}", 
          style: { size: 13, lineHeight: 1.5 } 
        },
      },
      {
        type: "section",
        showIf: "experience.length",
        label: "EXPERIENCE",
        labelStyle: { weight: 600, size: 14, color: "primary" },
        child: {
          type: "list",
          from: "experience",
          item: {
            type: "vstack",
            style: { mb: 12 },
            children: [
              { type: "text", text: "{{role}}", style: { weight: 600, size: 14 } },
              { 
                type: "text", 
                text: "{{company}} • {{start}} – {{end}}", 
                style: { color: "muted", size: 12 } 
              },
            ],
          },
        },
      },
    ],
  },
};
```

## Best Practices

1. **Use semantic block types** - Choose the most appropriate block for your content
2. **Validate schemas** - Always validate new templates before registration
3. **Test with sample data** - Ensure templates work with various data inputs
4. **Follow naming conventions** - Use consistent IDs and keys
5. **Document custom blocks** - Provide clear documentation for custom block types
6. **Consider accessibility** - Ensure good color contrast and readable fonts
7. **Optimize for ATS** - Use standard layouts that work well with ATS systems

## Troubleshooting

### Common Issues

1. **Template not rendering**: Check schema validation errors
2. **Missing data**: Ensure sample data matches template expectations
3. **Styling issues**: Verify style properties are supported
4. **Custom blocks not working**: Ensure block renderer is registered

### Debug Tools

```typescript
import { getRegisteredBlockTypes, getTemplateStatistics } from '@/lib/schema-utils';

// See all registered block types
console.log(getRegisteredBlockTypes());

// Get template system statistics
console.log(getTemplateStatistics());
```

## Future Enhancements

The system is designed to support:
- Dynamic theme switching
- Template versioning
- Template marketplace
- Advanced animations
- Multi-page layouts
- Export to multiple formats
- Template sharing and collaboration

## Contributing

When adding new features:
1. Update the registry system if needed
2. Add appropriate validation
3. Create example templates
4. Update documentation
5. Add tests for new functionality
