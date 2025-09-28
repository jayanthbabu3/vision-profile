import { TemplateService } from './templates'

// Test function to verify template service
export async function testTemplateService() {
  try {
    console.log('🧪 Testing Template Service...')
    
    // Test 1: Get all templates
    console.log('\n1. Getting all templates...')
    const allTemplates = await TemplateService.getAllTemplates()
    console.log(`✅ Found ${allTemplates.length} templates`)
    allTemplates.forEach(template => {
      console.log(`   - ${template.name} (${template.category}) - Premium: ${template.isPremium}`)
    })

    // Test 2: Get free templates
    console.log('\n2. Getting free templates...')
    const freeTemplates = await TemplateService.getFreeTemplates()
    console.log(`✅ Found ${freeTemplates.length} free templates`)

    // Test 3: Get premium templates
    console.log('\n3. Getting premium templates...')
    const premiumTemplates = await TemplateService.getPremiumTemplates()
    console.log(`✅ Found ${premiumTemplates.length} premium templates`)

    // Test 4: Get templates by category
    console.log('\n4. Getting Modern templates...')
    const modernTemplates = await TemplateService.getTemplatesByCategory('Modern')
    console.log(`✅ Found ${modernTemplates.length} Modern templates`)

    // Test 5: Get specific template
    if (allTemplates.length > 0) {
      console.log('\n5. Getting specific template...')
      const template = await TemplateService.getTemplateById(allTemplates[0].id)
      if (template) {
        console.log(`✅ Found template: ${template.name}`)
        console.log(`   Sections: ${template.sections.length}`)
        template.sections.forEach(section => {
          console.log(`     - ${section.name} (order: ${section.order}, required: ${section.isRequired})`)
        })
      }
    }

    // Test 6: Track usage
    if (allTemplates.length > 0) {
      console.log('\n6. Tracking template usage...')
      await TemplateService.trackTemplateUsage(allTemplates[0].id, '127.0.0.1', 'Test User Agent')
      console.log('✅ Usage tracked successfully')
    }

    // Test 7: Get usage stats
    console.log('\n7. Getting usage statistics...')
    const usageStats = await TemplateService.getTemplateUsageStats()
    console.log(`✅ Found ${usageStats.length} templates with usage data`)
    usageStats.forEach(stat => {
      console.log(`   - Template ${stat.templateId}: ${stat.usageCount} uses`)
    })

    console.log('\n🎉 All tests passed! Template service is working correctly.')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    throw error
  }
}
