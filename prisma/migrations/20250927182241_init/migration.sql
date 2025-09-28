-- CreateTable
CREATE TABLE "public"."templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "previewUrl" TEXT,
    "templateUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."template_sections" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,

    CONSTRAINT "template_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."template_usage" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "template_usage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."template_sections" ADD CONSTRAINT "template_sections_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_usage" ADD CONSTRAINT "template_usage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
