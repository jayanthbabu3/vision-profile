import { Sparkles, Target, Upload, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate compelling resume content with role-specific suggestions and impact-focused language.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Job Description Tailoring",
    description: "Automatically tailor your resume to match specific job descriptions and optimize for keywords.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Upload,
    title: "Upload & Prefill",
    description: "Upload your existing resume and let AI extract and organize your information intelligently.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "ATS Score Analysis",
    description: "Get real-time ATS compatibility scores with actionable recommendations for improvement.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const AIFeatures = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Features
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
            Your AI Resume Assistant
          </h2>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            Let artificial intelligence help you create the perfect resume with smart suggestions, 
            content generation, and optimization tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <button className="text-primary font-medium text-sm hover:underline">
                      Learn more →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Section */}
        <div className="mt-20 text-center">
          <div className="card-premium max-w-4xl mx-auto p-8 lg:p-12">
            <h3 className="font-heading font-semibold text-2xl mb-4">
              See AI in Action
            </h3>
            <p className="text-slate-600 mb-8">
              Watch how our AI transforms basic job details into compelling resume content
            </p>
            
            {/* Before/After Example */}
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="text-xs font-medium text-slate-500 mb-3">BEFORE (Basic Input)</div>
                <div className="text-sm text-slate-600">
                  "Worked on software projects at tech company. Used React and Node.js. Helped team meet deadlines."
                </div>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <div className="text-xs font-medium text-primary mb-3">AFTER (AI Enhancement)</div>
                <div className="text-sm text-slate-700">
                  "Led development of 3 high-impact React applications serving 50K+ users, utilizing Node.js microservices architecture. Collaborated with cross-functional teams to deliver projects 20% ahead of schedule, improving team velocity and client satisfaction."
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="btn-hero">
                Try AI Enhancement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;