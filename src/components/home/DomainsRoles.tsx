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
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
            Choose Your Domain
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get role-specific templates and AI suggestions tailored to your industry
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredDomain === index;
            
            return (
              <div
                key={index}
                className="card-premium group cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredDomain(index)}
                onMouseLeave={() => setHoveredDomain(null)}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${domain.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${domain.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${domain.color}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {domain.description}
                  </p>

                  {/* Popular Roles */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-500 mb-3">Popular roles:</p>
                    <div className="space-y-1">
                      {domain.roles.slice(0, isHovered ? 5 : 3).map((role, roleIndex) => (
                        <div key={roleIndex} className="flex items-center justify-between text-sm text-slate-600 hover:text-primary transition-colors">
                          <span>{role}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <button className="btn-ghost w-full text-sm">
                      View Templates
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Domains & Roles
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DomainsRoles;