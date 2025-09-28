-- AlterTable
ALTER TABLE "public"."templates" ADD COLUMN     "sampleData" JSONB,
ADD COLUMN     "templateSchema" JSONB;

-- CreateTable
CREATE TABLE "public"."resumes" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,
    "resumeData" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."resumes" ADD CONSTRAINT "resumes_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
