import { FileText, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileText,
    title: "Choose Your Role",
    description: "Select your domain and specific role to get tailored templates and AI suggestions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Edit with AI",
    description: "Let our AI help you write compelling content, tailor to job descriptions, and optimize for ATS.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Download,
    title: "Export & Apply",
    description: "Download your premium, ATS-friendly PDF resume and start applying to your dream jobs.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Create your perfect resume in minutes with our AI-powered platform
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent z-0"></div>
                )}
                
                {/* Step Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground hover:scale-[1.02] transition-all duration-200">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;