import { prisma } from './prisma'

export interface Template {
  id: string
  name: string
  description: string | null
  category: string
  tags: string[]
  isPremium: boolean
  previewUrl: string | null
  templateUrl: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  sections: TemplateSection[]
}

export interface TemplateSection {
  id: string
  templateId: string
  name: string
  order: number
  isRequired: boolean
  config: any
}

export class TemplateService {
  // Get all active templates
  static async getAllTemplates(): Promise<Template[]> {
    return await prisma.template.findMany({
      where: { isActive: true },
      include: { sections: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Get template by ID
  static async getTemplateById(id: string): Promise<Template | null> {
    return await prisma.template.findUnique({
      where: { id },
      include: { sections: true }
    })
  }

  // Get templates by category
  static async getTemplatesByCategory(category: string): Promise<Template[]> {
    return await prisma.template.findMany({
      where: { 
        category,
        isActive: true 
      },
      include: { sections: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Get free templates only
  static async getFreeTemplates(): Promise<Template[]> {
    return await prisma.template.findMany({
      where: { 
        isPremium: false,
        isActive: true 
      },
      include: { sections: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Get premium templates only
  static async getPremiumTemplates(): Promise<Template[]> {
    return await prisma.template.findMany({
      where: { 
        isPremium: true,
        isActive: true 
      },
      include: { sections: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Track template usage
  static async trackTemplateUsage(templateId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await prisma.templateUsage.create({
      data: {
        templateId,
        ipAddress,
        userAgent
      }
    })
  }

  // Get template usage statistics
  static async getTemplateUsageStats(templateId?: string) {
    const where = templateId ? { templateId } : {}
    
    const stats = await prisma.templateUsage.groupBy({
      by: ['templateId'],
      where,
      _count: {
        templateId: true
      }
    })

    return stats.map(stat => ({
      templateId: stat.templateId,
      usageCount: stat._count.templateId
    }))
  }
}
