import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const superResumes = [
  {
    role: "Senior Software Engineer",
    company: "Meta",
    years: "5+ years",
    highlights: ["Led team of 8 engineers", "Scaled systems to 10M users", "React, Go, Kubernetes"],
    rating: 4.9,
  },
  {
    role: "Product Manager",
    company: "Google",
    years: "7+ years",
    highlights: ["Launched 3 major features", "$50M revenue impact", "Cross-functional leadership"],
    rating: 4.8,
  },
  {
    role: "UX Designer",
    company: "Apple",
    years: "4+ years",
    highlights: ["Award-winning designs", "User research expert", "Design systems"],
    rating: 4.9,
  },
];

const SuperResumes = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Super Resumes
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
            Learn from the Best
          </h2>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            Study how top professionals at leading companies structure their resumes. 
            Get inspired by real examples from successful candidates.
          </p>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {superResumes.map((resume, index) => (
            <div key={index} className="card-premium group hover-lift cursor-pointer">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {resume.company[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{resume.company}</div>
                    <div className="text-sm text-slate-500">{resume.years}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{resume.rating}</span>
                </div>
              </div>

              {/* Role */}
              <h3 className="font-heading font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                {resume.role}
              </h3>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                {resume.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    {highlight}
                  </div>
                ))}
              </div>

              {/* Action */}
              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
                View Structure
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">50+</span>
            </div>
            <h4 className="font-semibold mb-2">Curated Examples</h4>
            <p className="text-sm text-slate-600">From top companies across industries</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-success">100%</span>
            </div>
            <h4 className="font-semibold mb-2">Privacy Protected</h4>
            <p className="text-sm text-slate-600">All personal information redacted</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">AI</span>
            </div>
            <h4 className="font-semibold mb-2">Structure Analysis</h4>
            <p className="text-sm text-slate-600">Learn what makes them effective</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="btn-hero">
            Explore Super Resumes
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuperResumes;