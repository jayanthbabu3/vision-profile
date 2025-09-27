import { ArrowRight, Play, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMockup from "@/assets/hero-mockup.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 lg:pt-28 lg:pb-40 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50"></div>
      
      {/* SVG-style Background Shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-60">
        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 rounded-full"></div>
        <div className="absolute top-4 left-4 w-24 h-24 border-2 border-primary/40 rounded-full animate-pulse"></div>
        <div className="absolute top-8 left-8 w-16 h-16 bg-accent/20 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-40 left-10 w-40 h-40 opacity-50">
        <div className="w-full h-full border-2 border-accent/50 rounded-full"></div>
        <div className="absolute top-6 left-6 w-28 h-28 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full"></div>
      </div>
      
      <div className="absolute top-32 left-1/4 w-8 h-8 bg-primary/30 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-accent/40 rounded-full opacity-80"></div>
      <div className="absolute top-60 right-1/3 w-10 h-10 border-2 border-primary/30 rounded-full opacity-60"></div>
      
      {/* Additional geometric shapes */}
      <div className="absolute top-40 left-20 w-12 h-12 border border-primary/25 rotate-45 opacity-50"></div>
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-br from-accent/15 to-transparent rotate-12 opacity-60"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-24 right-16 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-br from-accent/8 to-accent/3 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-Powered Resume Builder
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl leading-[1.1] tracking-tight">
                Build a{" "}
                <span className="relative">
                  <span className="text-gradient">premium</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg opacity-30"></div>
                </span>
                ,{" "}
                <br className="hidden sm:block" />
                <span className="text-gradient">ATS-friendly</span> resume
              </h1>
              <p className="text-base text-slate-500">
                Pick your role, choose a template, let AI tailor your resume to any job description. Get hired faster with professional, ATS-optimized resumes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground hover:scale-[1.02] transition-all duration-200 group">
                Start Building Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:border-primary/30 hover:text-primary transition-all duration-300 group">
                <Play className="w-4 h-4 mr-2" />
                View Templates
              </Button>
            </div>

            {/* Trust Indicators with Icons */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">10k+</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500">Resumes created</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="text-sm text-slate-500">95% ATS Compatible</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">4.9</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500">User rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main mockup container */}
            <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative">
                <img
                  src={heroMockup}
                  alt="Resume builder interface preview showing professional resume templates"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  loading="eager"
                />
                
                {/* Floating UI elements inspired by the references */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">ATS Optimized</div>
                      <div className="text-xs text-slate-500">100% Compatible</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">AI-Powered</div>
                      <div className="text-xs text-slate-500">Smart suggestions</div>
                    </div>
                  </div>
                </div>

                {/* Analytics card like in reference */}
                <div className="absolute top-16 -left-12 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden lg:block">
                  <div className="text-xs text-slate-500 mb-1">Active Users</div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">2.4k+</div>
                  <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;