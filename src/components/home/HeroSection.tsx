import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMockup from "@/assets/hero-mockup.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="badge-premium">
                ✨ AI-Powered Resume Builder
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
              Build a <span className="text-gradient">premium</span>,{" "}
              <span className="text-gradient">ATS-friendly</span> resume—powered by AI
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Pick your role, choose a template, let AI tailor your resume to any job description. 
              Get hired faster with professional, ATS-optimized resumes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-hero group">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-secondary group">
                <Play className="w-4 h-4 mr-2" />
                View Templates
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-12 justify-center lg:justify-start">
              <div className="text-sm text-slate-500">
                <div className="font-semibold text-slate-900">10,000+</div>
                <div>Resumes created</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-sm text-slate-500">
                <div className="font-semibold text-slate-900">95%</div>
                <div>ATS compatible</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-sm text-slate-500">
                <div className="font-semibold text-slate-900">4.9/5</div>
                <div>User rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative hover-lift">
              <img
                src={heroMockup}
                alt="Resume builder interface preview"
                className="w-full h-auto rounded-2xl shadow-premium"
                loading="eager"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                ✓ ATS Optimized
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                ⚡ AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;