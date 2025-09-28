import { PrismaClient } from '@prisma/client'
import { templateDefinitions } from '../src/lib/template-schemas'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create templates with schemas
  const templates = [];
  
  for (const templateDef of templateDefinitions) {
    const template = await prisma.template.upsert({
      where: { id: templateDef.id },
      update: {
        templateSchema: templateDef.schema,
        sampleData: templateDef.sampleData,
      },
      create: {
        id: templateDef.id,
        name: templateDef.name,
        description: templateDef.description,
        category: templateDef.category,
        tags: templateDef.tags,
        isPremium: templateDef.isPremium,
        previewUrl: templateDef.previewUrl || `/assets/template-${templateDef.category.toLowerCase()}.jpg`,
        templateSchema: templateDef.schema,
        sampleData: templateDef.sampleData,
        isActive: true,
      },
    });
    templates.push(template);
  }

  // Create template sections for each template
  for (const template of templates) {
    const sections = [
      { name: 'Header', order: 1, isRequired: true, config: { showPhoto: false, showContact: true } },
      { name: 'Summary', order: 2, isRequired: false, config: { maxLength: 200 } },
      { name: 'Experience', order: 3, isRequired: true, config: { showDates: true, showLocation: false } },
      { name: 'Education', order: 4, isRequired: true, config: { showGPA: false, showDates: true } },
      { name: 'Skills', order: 5, isRequired: true, config: { showLevel: false, categories: ['Technical', 'Soft Skills'] } },
    ];

    await prisma.templateSection.createMany({
      data: sections.map(section => ({
        templateId: template.id,
        ...section,
      })),
      skipDuplicates: true,
    });
  }

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${await prisma.template.count()} templates`)
  console.log(`Created ${await prisma.templateSection.count()} template sections`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
