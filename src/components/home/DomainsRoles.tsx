import { Code, Stethoscope, GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import { useState } from "react";

const domains = [
  {
    icon: Code,
    title: "Software & Tech",
    description: "Engineering, Product, Design",
    roles: ["Software Engineer", "Product Manager", "UX/UI Designer", "Data Scientist", "DevOps Engineer"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Medical, Nursing, Research",
    roles: ["Physician", "Nurse", "Medical Assistant", "Healthcare Administrator", "Clinical Researcher"],
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Teaching, Academia, Training",
    roles: ["Teacher", "Professor", "School Administrator", "Corporate Trainer", "Education Consultant"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Briefcase,
    title: "Business",
    description: "Finance, Marketing, Sales",
    roles: ["Financial Analyst", "Marketing Manager", "Sales Representative", "Business Analyst", "Consultant"],
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const DomainsRoles = () => {
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 mb-6">
            <Briefcase className="w-4 h-4 text-primary" />
            Choose Your Path
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4 text-slate-900">
            Choose Your Domain
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Get role-specific templates and AI suggestions tailored to your industry
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredDomain === index;
            
            return (
              <div
                key={index}
                className="group cursor-pointer relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-premium transition-all duration-300 hover:scale-[1.02] border border-slate-100"
                onMouseEnter={() => setHoveredDomain(index)}
                onMouseLeave={() => setHoveredDomain(null)}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${domain.bgColor} opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon and Action */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 ${domain.bgColor} rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                      <Icon className={`w-7 h-7 ${domain.color}`} />
                    </div>
                    <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <span>View Templates</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="font-heading font-bold text-xl mb-2 text-slate-900 group-hover:text-slate-800 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium">
                      {domain.description}
                    </p>
                  </div>

                  {/* Popular Roles */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Popular Roles</p>
                    <div className="space-y-2">
                      {domain.roles.slice(0, isHovered ? 5 : 3).map((role, roleIndex) => (
                        <div key={roleIndex} className="flex items-center justify-between text-sm text-slate-700 hover:text-primary transition-colors py-1">
                          <span className="font-medium">{role}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </div>
                      ))}
                      {!isHovered && domain.roles.length > 3 && (
                        <div className="text-xs text-slate-500 font-medium pt-1">
                          +{domain.roles.length - 3} more roles
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-slate-200 rounded-full group-hover:bg-primary/30 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-200 rounded-full group-hover:bg-accent/30 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary inline-flex items-center gap-2">
            View All Domains & Roles
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DomainsRoles;