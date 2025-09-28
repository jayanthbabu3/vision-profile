import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeEditor from "@/components/resume/ResumeEditor";
import { getTemplate } from "@/lib/template-registry";
import { SampleResumeData } from "@/lib/template-schemas";

const ResumeBuilder = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  const template = getTemplate(templateId || '');

  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <p className="text-slate-600 mb-6">The requested template could not be found.</p>
            <button 
              onClick={() => navigate('/templates')}
              className="btn-hero"
            >
              Browse Templates
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSave = (data: SampleResumeData) => {
    console.log("Saving resume:", data);
    // TODO: Implement save functionality
  };

  const handleExport = (data: SampleResumeData) => {
    console.log("Exporting resume:", data);
    // TODO: Implement export functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ResumeEditor 
          template={template.schema}
          initialData={template.sampleData}
          onSave={handleSave}
          onExport={handleExport}
        />
      </main>
    </div>
  );
};

export default ResumeBuilder;
